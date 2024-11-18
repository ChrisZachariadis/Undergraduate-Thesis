import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';
import {IEntry} from '../../interfaces/IPatientSummary';
import ResourceIPS from '../../../../components/ResourceIPS/ResourceIPS';
import globalStyle from '../../../../assets/styles/globalStyle';
import {IAllergyIntoleranceSummary} from '../../interfaces/types/IAllergyIntoleranceSummary';
import {ICarePlanSummary} from '../../interfaces/types/ICarePlanSummary';
import {IConditionSummary} from '../../interfaces/types/IConditionSummary';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {IDeviceSummary} from '../../interfaces/types/IDeviceSummary';
import {IDiagnosticReportSummary} from '../../interfaces/types/IDiagnosticReportSummary';
import {IProcedureSummary} from '../../interfaces/types/IProcedureSummary';
import {IImmunizationSummary} from '../../interfaces/types/IImmunizationSummary';
import {IObservationSummary} from '../../interfaces/types/IObservationSummary';
import {
  IMedication,
  IMedicationSummary,
} from '../../interfaces/types/IMedicationSummary';
import {
  IConsentSummary,
  IPractitionerRole,
} from '../../interfaces/types/IConsentSummary copy';
import {summaryResourcesState} from '../../../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import {SummaryResources} from '../../../../features/recoil/atoms/SummaryResources/SummaryResources';
import styles from './style';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Switch} from 'react-native-gesture-handler';
import {IBundle} from '../../../../features/recoil/interfaces/ISummaryResources';

const ResourceSelection = () => {
  const {t} = useTranslation();
  const [_, SetSummaryResources] = useRecoilState(summaryResourcesState);
  const [user, __] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(true);
  const [confirmationPhase, setConfirmationPhase] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState(t('shl.summary.show-all'));
  const [searchQuery, setSearchQuery] = useState('');
  const [rawData, setRawData] = useState<IEntry[]>([]);
  const [data, setData] = useState<IResource[]>([]);
  const [vizualizedData, setVizualizedData] = useState<IResource[]>([]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const flatListRef = useRef(null);
  const [bundleInfo, setBundleInfo] = useState({
    idSystem: '',
    valueSystem: '',
    type: '',
    timestamp: '',
  });

  interface IResource {
    fullUrl: string;
    resourceType: string;
    id: string;
    type: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
  }

  const excludedResourceTypes = [
    'Encounter',
    'Location',
    'Organization',
    'Practitioner',
    'MedicationStatement',
  ];

  const fetchData = async () => {
    try {
      return require('./MariaIosef.json');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(newData => {
      newData.entry = newData?.entry.filter(
        (entry: IEntry) =>
          !excludedResourceTypes.includes(entry.resource.resourceType),
      );
      newData.entry.sort((a: IEntry, b: IEntry) => {
        if (a.resource.resourceType < b.resource.resourceType) {
          return -1;
        }
        if (a.resource.resourceType > b.resource.resourceType) {
          return 1;
        }

        if (a.resource.meta.profile[0] < b.resource.meta.profile[0]) {
          return -1;
        }
        if (a.resource.meta.profile[0] > b.resource.meta.profile[0]) {
          return 1;
        }

        return 0;
      });
      setRawData(newData.entry);
      setBundleInfo({
        idSystem: newData.identifier.system,
        valueSystem: newData.identifier.value,
        type: newData.type,
        timestamp: newData.timestamp,
      });
      createResourceObjects(newData.entry);
      setConfirmationPhase(false);
    });
  }, []);

  function createResourceObjects(entries: IEntry[]) {
    const ResourceTable: IResource[] = [];
    entries.map(item => {
      let identification = t('no-data');
      let type = t('no-data');
      let info1 = t('no-data');
      let info2 = t('no-data');
      let info3 = t('no-data');
      let info4 = t('no-data');

      switch (item.resource.resourceType) {
        case 'AllergyIntolerance':
          const AllergyResource = item.resource as IAllergyIntoleranceSummary;
          if (
            AllergyResource.code.coding.at(0)?.display ===
            'No information about allergies'
          ) {
            return;
          }
          identification = AllergyResource.id;
          if (AllergyResource.type === 'allergy') {
            type = t('shl.summary.allergy');
          } else {
            type = t('shl.summary.intolerance');
          }
          info1 = `${t(
            'medicalHistory.medicalPersonalHistory.allergies.substance',
          )}: ${AllergyResource.code.coding.at(0)?.display || t('no-data')}`;
          info2 = `${t(
            'medicalHistory.medicalPersonalHistory.allergies.status',
          )}: ${
            AllergyResource.clinicalStatus.coding.at(0)?.display || t('no-data')
          }`;
          info3 = `${t(
            'medicalHistory.medicalPersonalHistory.allergies.category',
          )}: ${AllergyResource.category || t('no-data')}`;
          info4 = `${t(
            'medicalHistory.medicalPersonalHistory.allergies.criticality',
          )}: ${AllergyResource.criticality || t('no-data')}`;
          break;
        case 'CarePlan':
          const CarePlanResource = item.resource as ICarePlanSummary;
          identification = CarePlanResource.id;
          type = t('shl.summary.careplan');
          info1 = CarePlanResource.title;
          info2 = `${t(
            'medicalHistory.medicalPersonalHistory.medication.status',
          )}: ${CarePlanResource.status || t('no-data')}`;
          info3 = CarePlanResource.description || t('no-data');
          break;
        case 'Condition':
          const ConditionResource = item.resource as IConditionSummary;
          identification = ConditionResource.id;
          info1 = ConditionResource.code.coding.at(0)?.display || t('no-data');
          if (
            ConditionResource.clinicalStatus.coding.at(0)?.display === 'Active'
          ) {
            type = t('shl.summary.problem');
          } else {
            type = t('shl.summary.pastillness');
            info2 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.current.severity',
            )}: ${
              ConditionResource.severity.coding.at(0)?.display || t('no-data')
            }`;
            info3 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.current.onset',
            )}: ${
              dayjs(ConditionResource.onsetDateTime).format(DATE_FORMAT) ||
              t('no-data')
            }`;
            info4 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.resolved.resolution',
            )}: ${
              dayjs(ConditionResource.abatementDateTime).format(DATE_FORMAT) ||
              t('no-data')
            }`;
          }
          break;
        case 'Device':
          const DeviceResource = item.resource as IDeviceSummary;
          identification = DeviceResource.id;
          type = t('shl.summary.device');
          info1 = DeviceResource.type.coding.at(0)?.display || t('no-data');
          info2 = `${t(
            'medicalHistory.medicalPersonalHistory.medication.status',
          )}: ${DeviceResource.status || t('no-data')}`;
          break;
        case 'DiagnosticReport':
          const DiagnosticReportResource =
            item.resource as IDiagnosticReportSummary;
          identification = DiagnosticReportResource.id;
          type = t('shl.summary.diagnosis');
          info1 =
            DiagnosticReportResource.category.at(0)?.coding.at(0)?.display ||
            t('no-data');
          if (DiagnosticReportResource.code.coding) {
            info2 =
              DiagnosticReportResource.code.coding.at(0)?.display ||
              t('no-data');
          }
          info3 = `${t(
            'medicalHistory.medicalPersonalHistory.problems.functional.date',
          )}: ${
            dayjs(DiagnosticReportResource.effectiveDateTime).format(
              DATE_FORMAT,
            ) || t('no-data')
          }`;
          break;
        case 'Procedure':
          const ProcedureResource = item.resource as IProcedureSummary;
          identification = ProcedureResource.id;
          type = t('shl.summary.procedure');
          info1 = ProcedureResource.code.coding.at(0)?.display || t('no-data');
          info2 = `${t(
            'medicalHistory.medicalPersonalHistory.problems.procedures.bodysite',
          )}: ${
            ProcedureResource.bodySite.at(0)?.coding.at(0)?.display ||
            t('no-data')
          }`;
          info3 = `${t(
            'medicalHistory.medicalPersonalHistory.problems.procedures.date',
          )}: ${
            dayjs(ProcedureResource.performedDateTime).format(DATE_FORMAT) ||
            t('no-data')
          }`;
          break;
        case 'Immunization':
          const ImmunizationResource = item.resource as IImmunizationSummary;
          identification = ImmunizationResource.id;
          type = t('shl.summary.immunization');
          info1 =
            ImmunizationResource.vaccineCode.coding.at(0)?.display ||
            t('no-data');
          info2 = `${t('medicalHistory.immunization.details.batch-number')}: ${
            ImmunizationResource.lotNumber || t('no-data')
          }`;
          info3 = `${t('medicalHistory.immunization.date')}: ${
            dayjs(ImmunizationResource.occurrenceDateTime).format(
              DATE_FORMAT,
            ) || t('no-data')
          }`;
          break;
        case 'Observation':
          const ObservationResource = item.resource as IObservationSummary;
          identification = ObservationResource.id;
          type = 'Test';
          switch (ObservationResource.code.coding.at(0)?.code) {
            case '8310-5': // Body Temperature
            case '29463-7': // Body weight
            case '8867-4': // Heart rate
            case '8302-2': // Body height
            case '9279-1': // Respiratory rate
            case '363812007': // Head circumference
            case '38699-5': // Dichloroethane [Mass/volume] in Air
            case '14258-8': // Dioxane [Mass/volume] in Blood
            case '80628-1': // Methylthioethane [Mass/volume] in Urine
            case '38624-3': // Trichloroethane [Mass/volume] in Air
              type = t('shl.summary.vital-sign');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 = `${t('shl.summary.measurment')}: ${
                ObservationResource.valueQuantity.value
              } ${ObservationResource.valueQuantity.unit}`;
              info3 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '11640-0': // Total Births
            case '33065-4': // Total ectopic pregnancies
            case '11612-9': // Total Abortions
              type = t('shl.summary.pregnancy');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 = `${t('shl.summary.measurment')}: ${
                ObservationResource.valueQuantity.value
              }`;
              info3 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '11779-6': // Pregnancy expected Delivery (last menstrual period)
            case '11778-8': // Pregnancy expected Delivery (clinical)
            case '11780-4': // Pregnancy expected Delivery (ovulation)
              type = t('shl.summary.pregnancy');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 = `${t('shl.summary.expectedDate')}: ${
                dayjs(ObservationResource.valueDateTime).format(DATE_FORMAT) ||
                t('no-data')
              }`;
              info3 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '85354-9': // Blood pressure panel with all children
              type = t('shl.summary.vital-sign');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '401175000': // Sleep pattern finding
            case '228366006': // drug misuse behavior
            case '82810-3': // Pregnancy status
              type = t('shl.summary.social-history');
              if (ObservationResource.code.coding.at(0)?.code === '82810-3') {
                type = t('shl.summary.pregnancy');
              }
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 =
                ObservationResource.valueCodeableConcept?.coding?.at(0)
                  ?.display || t('no-data');
              info3 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '8691-8': // History of travel
              type = t('shl.summary.travel-history');
              info1 = `${t('shl.summary.country')}: ${
                ObservationResource.valueCodeableConcept.coding.at(0)
                  ?.display || t('no-data')
              }`;
              info2 = `${t('dates.arrival')}: ${
                dayjs(ObservationResource.effectivePeriod.start).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              info3 = `${t('dates.departure')}: ${
                dayjs(ObservationResource.effectivePeriod.end).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '80439-3': // Current Drinker
              type = t('shl.summary.social-history');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 = t('shl.summary.no-drinker');
              if (ObservationResource.component) {
                info2 = `${t(
                  'medicalHistory.socialHistory.alcohol-consumption.alcohol-type',
                )}: ${
                  ObservationResource.component
                    ?.at(0)
                    ?.extension.at(0)
                    ?.valueCodeableConcept.coding.at(0)?.display || t('no-data')
                }`;
                info3 = `${t(
                  'medicalHistory.socialHistory.alcohol-consumption.alcohol-intake-per-day',
                )}: ${
                  ObservationResource.component.at(0)?.valueQuantity.value ||
                  t('no-data')
                }`;
                info4 = `${t(
                  'medicalHistory.medicalPersonalHistory.problems.functional.date',
                )}: ${
                  dayjs(ObservationResource.effectiveDateTime).format(
                    DATE_FORMAT,
                  ) || t('no-data')
                }`;
              }
              break;
            case '72166-2': // Smoking Status
              type = t('shl.summary.social-history');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 = `${t('shl.summary.smoking-product')}: ${
                ObservationResource.component
                  .at(0)
                  ?.valueCodeableConcept.coding.at(0)?.display || t('no-data')
              }`;
              info3 = `${t('shl.summary.smoking-quantity')}: ${
                ObservationResource.component.at(1)?.valueInteger ||
                t('no-data')
              }`;
              info4 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '55409-7': // Exercise
              type = t('shl.summary.social-history');

              info1 = `${t('shl.summary.activity')}: ${
                ObservationResource.component
                  ?.at(0)
                  ?.valueCodeableConcept.coding.at(0)?.display || t('no-data')
              }`;
              info2 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectivePeriod.start).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            case '99631-4': // Cone beam
            case '96912-1': // CT global noise
            case '36086-7': // CT Abdomen limited
              type = t('shl.summary.imaging');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
              info2 = `${t('shl.summary.measurment')}: ${
                ObservationResource.valueString
              }`;
              info3 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
              break;
            default:
              type = t('shl.summary.unknown');
              info1 =
                ObservationResource.code.coding.at(0)?.display || t('no-data');
          }
          break;
        case 'MedicationRequest':
          const MedicationResource = item.resource as IMedicationSummary;
          const medicine = entries?.find(
            entry =>
              entry.resource.id ===
              MedicationResource.medicationReference.reference.split('/')[1],
          )?.resource as IMedication;
          identification = MedicationResource.id;
          type = t('shl.summary.medication');
          info1 =
            medicine.extension.at(1)?.extension.at(0)?.valueString ||
            t('no-data');
          info2 = `${t('shl.summary.quantity')}: ${
            MedicationResource.dispenseRequest.quantity.value || t('no-data')
          }`;
          info3 = `${t('shl.summary.issuedDate')}: ${
            dayjs(
              MedicationResource.dispenseRequest.validityPeriod.start,
            ).format(DATE_FORMAT) || t('no-data')
          }`;
          break;
        case 'Consent':
          const ConsentResource = item.resource as IConsentSummary;
          const practitionerRole = entries?.find(
            entry =>
              entry.resource.id ===
              ConsentResource.performer.at(0)?.reference.split('/')[1],
          )?.resource as IPractitionerRole;
          identification = ConsentResource.id;
          type = t('shl.summary.consent');
          info1 = ConsentResource.scope.coding.at(0)?.display || t('no-data');
          info2 = `${t(
            'medicalHistory.medicalPersonalHistory.medication.status',
          )}: ${ConsentResource.status || t('no-data')}`;
          info3 = `${t('shl.summary.provider-role')}: ${
            practitionerRole.code.at(0)?.coding.at(0)?.display || t('no-data')
          }`;
          info4 = `${t('shl.summary.issuedDate')}: ${
            dayjs(ConsentResource.dateTime).format(DATE_FORMAT) || t('no-data')
          }`;
          break;
        default:
          identification = t('no-data');
      }
      if (identification !== t('no-data')) {
        ResourceTable.push({
          fullUrl: item.fullUrl,
          resourceType: item.resource.resourceType,
          id: identification,
          type: type,
          text1: info1,
          text2: info2,
          text3: info3,
          text4: info4,
        });
      }
    });
    setData(ResourceTable);
    setVizualizedData(ResourceTable);
    setSelectedResources(ResourceTable.map(item => item.fullUrl));
  }

  // Switch to confirmation phase
  useEffect(() => {
    flatListRef.current.scrollToOffset({animated: false, offset: 0});
    if (confirmationPhase) {
      setVizualizedData(
        data.filter(item => selectedResources.includes(item.fullUrl)),
      );
    } else {
      setVizualizedData(data);
    }
  }, [confirmationPhase]);

  const changeCategory = () => {
    if (dropdownValue === t('shl.summary.show-all')) {
      setVizualizedData(data);
      return;
    }
    setVizualizedData(data.filter(item => item.type === dropdownValue));
    setSearchQuery('');
  };
  // Category Selection Functionality
  useEffect(() => {
    changeCategory();
  }, [dropdownValue]);

  // Select all Resources Functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedResources([]);
    } else {
      setSelectedResources(data.map(item => item.fullUrl));
    }
    setSelectAll(!selectAll);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      changeCategory();
      return;
    }
    setVizualizedData(
      vizualizedData.filter(item => {
        return (
          item.text1.toLowerCase().includes(query.toLowerCase()) ||
          item.text2.toLowerCase().includes(query.toLowerCase()) ||
          item.text3.toLowerCase().includes(query.toLowerCase()) ||
          item.text4.toLowerCase().includes(query.toLowerCase())
        );
      }),
    );
  };

  const updateRecoilResources = () => {
    const patientResource = rawData.find(
      item => item.resource.resourceType === 'Patient',
    );
    const compositionResource = rawData.find(
      item => item.resource.resourceType === 'Composition',
    );

    const summaryResources: IBundle = {
      resourceType: 'Bundle',
      identifier: {
        system: bundleInfo.idSystem,
        value: bundleInfo.valueSystem,
      },
      type: bundleInfo.type,
      timestamp: bundleInfo.timestamp,
      entry: rawData.filter(item =>
        selectedResources.includes(item.fullUrl),
      ) as IEntry[],
    };
    summaryResources.entry.push(patientResource as IEntry);
    summaryResources.entry.push(compositionResource as IEntry);
    SetSummaryResources(new SummaryResources(true, summaryResources));
  };

  const renderItem = (item: IResource) => {
    if (confirmationPhase && !selectedResources.includes(item.fullUrl)) {
      return;
    }
    return (
      <ResourceIPS
        id={item.id}
        selected={selectedResources.includes(item.fullUrl)}
        addID={() => setSelectedResources([...selectedResources, item.fullUrl])}
        removeID={() =>
          setSelectedResources(
            selectedResources.filter(resource => resource !== item.fullUrl),
          )
        }
        type={item.type}
        text1={item.text1}
        text2={item.text2}
        text3={item.text3}
        text4={item.text4}
        phase={confirmationPhase}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={globalStyle.descriptionBlackL2}>
          {confirmationPhase ? t('shl.confirm-promt') : t('shl.select-promt')}
        </Text>
        {!confirmationPhase && (
          <TouchableOpacity style={styles.row}>
            <Switch value={selectAll} onValueChange={handleSelectAll} />
            <Text style={globalStyle.descriptionBlackL3}>
              {t('shl.select-all')}
            </Text>
          </TouchableOpacity>
        )}

        {!confirmationPhase && (
          <View style={[styles.row, styles.searchContainer]}>
            <CategoryDropdown
              value={dropdownValue}
              setValue={setDropdownValue}
            />
            <View style={[styles.row, styles.searchInput]}>
              <FontAwesomeIcon icon={faSearch} />
              <TextInput
                style={styles.searchInputText}
                placeholder={t('general.search')}
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
          </View>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        style={[styles.flatList, confirmationPhase && styles.flatListConfirm]}
        data={vizualizedData}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
      />
      <View style={styles.containerButton}>
        <TouchableOpacity
          disabled={!confirmationPhase}
          style={[
            globalStyle.Button,
            confirmationPhase ? styles.backButton : styles.backButtonDisabled,
          ]}
          onPress={() => setConfirmationPhase(false)}>
          <Text style={globalStyle.buttonText}>{t('general.back')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyle.Button, styles.continueButton]}
          onPress={() => {
            if (confirmationPhase) {
              updateRecoilResources();
            } else {
              setConfirmationPhase(true);
            }
          }}>
          <Text style={globalStyle.buttonText}>
            {confirmationPhase ? t('shl.confirm') : t('general.continue')}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default ResourceSelection;
