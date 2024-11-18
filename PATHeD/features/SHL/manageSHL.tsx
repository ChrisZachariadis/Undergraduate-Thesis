import {useRecoilState} from 'recoil';
import {shLinksState} from '../recoil/atoms/Shlinks/shlinksState';
import {Alert} from 'react-native';

export function useDeleteLink() {
  const [_, setLinks] = useRecoilState(shLinksState);

  const deleteLinkById = (linkId: string) => {
    setLinks(oldLinksArray => {
      return {
        ...oldLinksArray,
        links: oldLinksArray.links.filter(link => link.id !== linkId),
      };
    });
  };

  return (
    id: string,
    title: string,
    message: string,
    cancel: string,
    ok: string,
  ) => {
    Alert.alert(
      title,
      message,
      [
        {text: cancel, style: 'cancel'},
        {text: ok, onPress: () => deleteLinkById(id)},
      ],
      {cancelable: true},
    );
  };
}
