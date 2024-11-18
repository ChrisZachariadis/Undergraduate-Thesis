import React, {useEffect, useRef, useState} from 'react';
import {Alert, Animated, FlatList, Pressable, Text, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleLeft,
  faInfoCircle,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {horizontalScale} from '../../assets/styles/scaling';
import ModalComponent from '../ModalComponent/ModalComponent';
import ViewLink from '../../screens/ShlScreen/components/ViewLink/ViewLink';
import {useRecoilState} from 'recoil';
import {shlHistoryState} from '../../features/recoil/atoms/ShlHistory/shlHistoryState';
import {userState} from '../../features/recoil/atoms/User/userState';
import Loading from '../Loading/Loading';
import {deleteLink, getLinks} from '../../screens/ShlScreen/api/shlFunctions';

const ListItem = ({item, onDelete}) => {
  const swipeThreshold = 80;
  const [modalVisible, setModalVisible] = useState(false);
  const swipeableRef = useRef(null);

  const closeSwipeable = () => {
    swipeableRef.current?.close();
  };

  const renderRightActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [-swipeThreshold, 0],
      outputRange: [100, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightAction}>
        <Animated.View style={{opacity}}>
          <FontAwesomeIcon
            icon={faTrashCan}
            color="white"
            size={horizontalScale(17)}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View>
      {modalVisible && (
        <ModalComponent
          title={''}
          visibility={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}>
          <View>
            <ViewLink data={item} />
          </View>
        </ModalComponent>
      )}

      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => onDelete(closeSwipeable)}
        rightThreshold={swipeThreshold}>
        <Pressable
          style={styles.listItemContainer}
          onPress={() => setModalVisible(true)}>
          <View style={styles.listItem}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              size={horizontalScale(15)}
              color="grey"
            />
            <Text style={styles.listItemText}>
              {'   '}
              {item.label}
            </Text>
          </View>

          <FontAwesomeIcon
            icon={faAngleLeft}
            size={horizontalScale(15)}
            color="grey"
          />
        </Pressable>
      </Swipeable>
    </View>
  );
};

const ShlHistory = () => {
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);
  const [user, _] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateHistory = async () => {
      setLoading(true);
      try {
        const data = await getLinks(user.token, user.id);
        if (!data || !data.data) {
          throw new Error('No data received from the server.');
        }
        const updatedList = data.data.map(item => {
          const existingItem = shlHistory.shLinks.find(
            shl => shl.shl === item.shl,
          );
          return existingItem
            ? {...item, passcode: existingItem.passcode}
            : {...item, passcode: 'Unknown'};
        });
        setShlHistory({shLinks: updatedList});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    updateHistory();
  }, []);

  const handleDeleteShl = async (Delete_Link, closeSwipeable) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this Smart Health Link?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: closeSwipeable, // Close the swipeable item when cancel is pressed
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteLink(Delete_Link, user.token);
              const updatedLinks = shlHistory.shLinks.filter(
                link => link.shl !== Delete_Link,
              );
              setShlHistory({...shlHistory, shLinks: updatedLinks});
              Alert.alert('Success', 'Smart Health Link deleted successfully');
            } catch (error) {
              console.log('error', error);
              Alert.alert('Error', 'Something went wrong');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      <FlatList
        data={shlHistory.shLinks}
        renderItem={({item}) => (
          <ListItem
            item={item}
            onDelete={closeSwipeable => {
              handleDeleteShl(item.shl, closeSwipeable);
            }}
          />
        )}
        keyExtractor={item => item.shl}
      />
      {loading && <Loading />}
    </View>
  );
};

export default ShlHistory;
