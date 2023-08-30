import React, { useState, useEffect } from 'react';
import { AccountGrid } from 'features/users-overview/styles';
import { Input, Checkbox } from 'components/ui';
import { Stack } from 'components/system';
import { AddIcon, DeleteIcon } from 'components/svg';
import { useDebounce, useSnackbar } from 'hooks';
import { getLocations } from 'utilities/locations';
import { getCompanys } from 'utilities/companys';
import { TWorkExperience } from 'api/workExperience/types';
import HouseWorkExperienceApi from 'api/workExperience';

const WorkExperience = (props: any) => {
  const { totalData, setTotalData, setHasChanged, saving, setSaving, userId } =
    props;
  const { push } = useSnackbar();

  const [InsertedArray, setInsertedArray] = useState<any[]>([]);
  const [EditedArray, setEditedArray] = useState<any[]>([]);
  const [DeletedArray, setDeletedArray] = useState<any[]>([]);

  const [saveState, setSaveState] = useState({
    Updated: false,
    Inserted: false,
    Deleted: false,
  });

  const handleInsert = async () => {
    try {
      InsertedArray.forEach(async (id) => {
        const insertedDatas = totalData.filter(
          (element: any) => element.id === id
        );
        await HouseWorkExperienceApi.createHouseWorkExperience(
          insertedDatas[0]
        );
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleUpdate = async () => {
    try {
      EditedArray.forEach(async (id) => {
        const editedDatas = totalData.filter(
          (element: any) => element.id === id
        );
        const data = editedDatas[0];
        await HouseWorkExperienceApi.updateHouseWorkExperience(data, id);
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // eslint-disable-next-line
  const handleDeleteing = async () => {
    try {
      DeletedArray.forEach(async (id) => {
        await HouseWorkExperienceApi.deleteHouseWorkExperience(id);
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleAdd = () => {
    const items = [...totalData].sort((a: any, b: any) => {
      return b['id'] > a['id'] ? -1 : 1;
    });
    const newData: TWorkExperience = {
      id: items[items.length - 1].id + 1,
      jobTitle: '',
      company: '',
      location: '',
      from: '',
      to: '',
      stillWorkHere: false,
      roleDescription: '',
      ownerId: userId,
      createdAt: '',
      updatedAt: '',
    };
    const json = JSON.stringify(totalData);
    const tempTotalData = JSON.parse(json);
    tempTotalData.push(newData);

    setTotalData([...tempTotalData]);
    const exist = InsertedArray.includes(newData.id);
    if (!exist) {
      let Array = InsertedArray;
      Array.push(newData.id);
      setInsertedArray(Array);
    }
    getLocationOptions();
    getCompanyOptions();
  };

  const handleEdit = (id: any) => {
    const exist = EditedArray.includes(id);
    const existsInInsert = InsertedArray.includes(id);
    if (!exist && !existsInInsert) {
      let Array = EditedArray;
      Array.push(id);
      setEditedArray(Array);
    }
  };

  const handleDelete = (id: any) => {
    const index = InsertedArray.indexOf(id);
    if (index > -1) {
      InsertedArray.splice(index, 1);
      const tempData = totalData.filter((item: any) => item.id !== id);
      setTotalData([...tempData]);
      return;
    }
    const index1 = EditedArray.indexOf(id);
    if (index1 > -1) {
      EditedArray.splice(index1, 1);
    }

    const exist = DeletedArray.includes(id);
    if (!exist) {
      let Array = DeletedArray;
      Array.push(id);
      setDeletedArray(Array);
    }

    const tempData = totalData.filter((item: any) => item.id !== id);
    setTotalData([...tempData]);
    setHasChanged(true);
  };

  const handleSave = () => {
    setSaveState({
      Updated: false,
      Inserted: false,
      Deleted: false,
    });

    /////// Insert /////////
    handleInsert()
      .then((res) => {
        setInsertedArray([]);
        setSaveState((oldStates) => ({
          ...oldStates,
          Inserted: true,
        }));
      })
      .catch((error) => {
        push('Something went wrong when adding work experiences.', {
          variant: 'error',
        });
        setSaveState((oldStates) => ({
          ...oldStates,
          Inserted: true,
        }));
      });

    /////// Update /////////
    handleUpdate()
      .then((res) => {
        setEditedArray([]);
        setSaveState((oldStates) => ({
          ...oldStates,
          Updated: true,
        }));
      })
      .catch((error) => {
        push('Something went wrong when updating work experiences.', {
          variant: 'error',
        });
        setSaveState((oldStates) => ({
          ...oldStates,
          Updated: true,
        }));
      });

    ////////// delete //////////
    handleDeleteing()
      .then((res) => {
        setDeletedArray([]);
        setSaveState((oldStates) => ({
          ...oldStates,
          Deleted: true,
        }));
      })
      .catch((error) => {
        push('Something went wrong when deleting work experiences.', {
          variant: 'error',
        });
        setSaveState((oldStates) => ({
          ...oldStates,
          Deleted: true,
        }));
      });
  };

  useEffect(() => {
    if (saveState.Inserted && saveState.Deleted && saveState.Updated) {
      setHasChanged(false);
      setSaving(false);
    }
    // eslint-disable-next-line
  }, [saveState]);

  useEffect(() => {
    if (saving) {
      handleSave();
    }
  }, [saving]);

  const handleChange = (name: string, value: any, id: any) => {
    handleEdit(id);
    const json = JSON.stringify(totalData);
    const tempTotalData = JSON.parse(json);
    const objIndex = tempTotalData.findIndex((obj: any) => obj.id === id);
    tempTotalData[objIndex][name] = value;
    setHasChanged(true);
    setTotalData(() => [...tempTotalData]);
  };

  const [locations, setLocations] = useState<any[]>([]);
  const [companys, setCompanys] = useState<any[]>([]);

  const getLocationOptions = async (searchTerm: string = '') => {
    const result = getLocations(searchTerm);
    setLocations(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getCompanyOptions = async (searchTerm: string = '') => {
    const result = getCompanys(searchTerm);
    setCompanys(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const debouncedLocation = useDebounce(getLocationOptions, 100);
  const debouncedCompanies = useDebounce(getCompanyOptions, 100);

  useEffect(() => {
    getLocationOptions();
    getCompanyOptions();
  }, []);

  useEffect(() => {
    if (totalData && totalData.length === 0) {
      const newData: TWorkExperience = {
        id: 1,
        jobTitle: '',
        company: '',
        location: '',
        from: '',
        to: '',
        stillWorkHere: false,
        roleDescription: '',
        ownerId: userId,
        createdAt: '',
        updatedAt: '',
      };
      const json = JSON.stringify(totalData);
      const tempTotalData = JSON.parse(json);
      tempTotalData.push(newData);

      setTotalData([...tempTotalData]);
      const exist = InsertedArray.includes(newData.id);
      if (!exist) {
        let Array = InsertedArray;
        Array.push(newData.id);
        setInsertedArray(Array);
      }
      getLocationOptions();
      getCompanyOptions();
    }
  }, [totalData]);
  return (
    <>
      {totalData?.map((experience: TWorkExperience) => {
        return (
          <AccountGrid style={{ position: 'relative', marginBottom: '20px' }}>
            <Input
              type="text"
              label="Job Title"
              placeholder="Please Enter"
              value={experience.jobTitle}
              onValue={(jobTitle) =>
                handleChange('jobTitle', jobTitle, experience.id)
              }
            />
            <Input
              type="select"
              label="Company"
              placeholder="Please Select"
              onSearch={debouncedCompanies}
              options={companys}
              value={
                experience.company
                  ? {
                      label: experience.company,
                      value: experience.company,
                    }
                  : null
              }
              onValue={(company) =>
                handleChange(
                  'company',
                  company ? company.value : company,
                  experience.id
                )
              }
              onNewTag={(company) =>
                handleChange('company', company.value, experience.id)
              }
            />
            <Input
              type="select"
              label="Location"
              onSearch={debouncedLocation}
              placeholder="Please Select"
              options={locations}
              value={
                experience.location
                  ? {
                      label: experience.location,
                      value: experience.location,
                    }
                  : null
              }
              onValue={(location) =>
                handleChange(
                  'location',
                  location ? location.value : location,
                  experience.id
                )
              }
              onNewTag={(location) =>
                handleChange('location', location.value, experience.id)
              }
            />
            <Stack direction="horizontal" style={{ position: 'relative' }}>
              <Input
                type="date"
                label="From"
                placeholder="Please Select"
                value={experience.from}
                onValue={(from) => handleChange('from', from, experience.id)}
              />
              <Input
                type="date"
                label="To"
                placeholder="Please Select"
                value={
                  experience.stillWorkHere
                    ? new Date().toISOString()
                    : experience.to
                }
                disabled={experience.stillWorkHere}
                onValue={(to) => handleChange('to', to, experience.id)}
              />
              <Checkbox
                label="I still work here."
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '-25px',
                }}
                value={experience.stillWorkHere}
                onValue={(stillWorkHere) =>
                  handleChange('stillWorkHere', stillWorkHere, experience.id)
                }
              />
            </Stack>
            <Input
              type="text"
              label="Role Description"
              placeholder="Please Enter"
              style={{ gridColumn: '1/3' }}
              value={experience.roleDescription}
              onValue={(roleDescription) =>
                handleChange('roleDescription', roleDescription, experience.id)
              }
            />
            <Stack
              style={{
                position: 'absolute',
                right: '36px',
                top: '90px',
                width: 'fit-content',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Stack
                style={{ cursor: 'pointer' }}
                onClick={() => handleDelete(experience.id)}
              >
                <DeleteIcon style={{ color: '#9F9FB0' }} />
              </Stack>
              <Stack style={{ cursor: 'pointer' }} onClick={handleAdd}>
                <AddIcon style={{ color: '#9F9FB0' }} />
              </Stack>
            </Stack>
          </AccountGrid>
        );
      })}
    </>
  );
};

export default WorkExperience;
