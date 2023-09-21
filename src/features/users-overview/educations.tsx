import React, { useState, useEffect } from 'react';
import { AccountGrid } from 'features/users-overview/styles';
import { Input } from 'components/ui';
import { Stack } from 'components/system';
import { AddIcon, DeleteIcon } from 'components/svg';
import { useSnackbar } from 'hooks';
import EducationApi from 'api/education';
import { TEducation } from 'api/education/types';
import { getDegrees } from 'utilities/degrees';
import { getFieldOfStudies } from 'utilities/fieldOfStudy';
import { birthDateSchema } from 'utilities/validators';
import EducationExperienceDateRangePicker from '../account/role/user//elements/EducationExperienceDateRangePicker';

const Education = (props: any) => {
  const {
    totalData,
    setTotalData,
    setHasChanged,
    saving,
    setSaving,
    userId,
    userInfo,
    disabled,
    eduIssuedArrays,
    setEduIssuedArrays,
  } = props;
  const { push } = useSnackbar();

  const [InsertedArray, setInsertedArray] = useState<any[]>([]);
  const [EditedArray, setEditedArray] = useState<any[]>([]);
  const [DeletedArray, setDeletedArray] = useState<any[]>([]);

  const [degrees, setDegrees] = useState<any[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<any[]>([]);

  const [saveState, setSaveState] = useState({
    Updated: false,
    Inserted: false,
    Deleted: false,
  });

  const handleInsert = async () => {
    try {
      await Promise.all(
        InsertedArray.map(async (id) => {
          const insertedDatas = totalData.filter(
            (element: any) => element.id === id
          );
          await EducationApi.createEducation(insertedDatas[0]);
        })
      );
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleErrors = (id: string) => (value: boolean) => {
    if (value) {
      const exist = eduIssuedArrays.includes(id);
      if (!exist) {
        let Array = eduIssuedArrays;
        Array.push(id);
        setEduIssuedArrays([...Array]);
      }
    } else {
      const tempData = eduIssuedArrays.filter((item: any) => item !== id);
      setEduIssuedArrays([...tempData]);
    }
  };

  const handleUpdate = async () => {
    try {
      await Promise.all(
        EditedArray.map(async (id) => {
          const editedDatas = totalData.filter(
            (element: any) => element.id === id
          );
          const data = editedDatas[0];
          await EducationApi.updateEducation(data, id);
        })
      );
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // eslint-disable-next-line
  const handleDeleteing = async () => {
    try {
      await Promise.all(
        DeletedArray.map(async (id) => {
          await EducationApi.deleteEducation(id);
        })
      );

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleAdd = () => {
    const items = [...totalData].sort((a: any, b: any) => {
      return b['id'] > a['id'] ? -1 : 1;
    });
    const newData: TEducation = {
      id: items[items.length - 1].id + 1,
      university: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      overAllGPA: 0,
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
    getDegreeOptions();
    getFieldOfStudyOptions();
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
        push('Something went wrong when adding educations.', {
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
        push('Something went wrong when updating educations.', {
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
        push('Something went wrong when deleting educations.', {
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

  const getDegreeOptions = async (searchTerm: string = '') => {
    const result = getDegrees(searchTerm);
    setDegrees(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getFieldOfStudyOptions = async (searchTerm: string = '') => {
    const result = getFieldOfStudies(searchTerm);
    setFieldOfStudy(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  useEffect(() => {
    getDegreeOptions();
    getFieldOfStudyOptions();
  }, []);

  useEffect(() => {
    if (totalData.length === 0) {
      const newData: TEducation = {
        id: 1,
        university: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        overAllGPA: 0,
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
      getDegreeOptions();
      getFieldOfStudyOptions();
    }
  }, [totalData]);

  return (
    <>
      {totalData?.map((education: TEducation, index: any) => {
        return (
          <AccountGrid style={{ position: 'relative', marginBottom: '20px' }}>
            <Input
              type="text"
              label="School or University"
              placeholder="Please Select"
              value={education.university}
              onValue={(university) =>
                handleChange('university', university, education.id)
              }
              disabled={disabled}
            />

            <Input
              type="select"
              label="Degree"
              placeholder="Please Select"
              options={degrees}
              disabled={disabled}
              value={
                education.degree
                  ? {
                      label: education.degree,
                      value: education.degree,
                    }
                  : null
              }
              onValue={(degree) =>
                handleChange(
                  'degree',
                  degree ? degree.value : degree,
                  education.id
                )
              }
            />
            <Input
              type="select"
              label="Field of Study"
              placeholder="Please Select"
              options={fieldOfStudy}
              disabled={disabled}
              value={
                education.fieldOfStudy
                  ? {
                      label: education.fieldOfStudy,
                      value: education.fieldOfStudy,
                    }
                  : null
              }
              onValue={(fieldOfStudy) =>
                handleChange(
                  'fieldOfStudy',
                  fieldOfStudy ? fieldOfStudy.value : fieldOfStudy,
                  education.id
                )
              }
            />

            <EducationExperienceDateRangePicker
              education={education}
              handleChange={handleChange}
              handleErrors={handleErrors(`${education.id}_${index}_to`)}
              userBirthDate={userInfo.dateOfBirth}
              disabled={disabled}
            />

            <Input
              type="text"
              label="Overall GPA"
              placeholder="Please Enter"
              disabled={disabled}
              value={education.overAllGPA}
              onValue={(overAllGPA) =>
                handleChange('overAllGPA', overAllGPA, education.id)
              }
            />
            {!disabled && (
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
                  onClick={() => handleDelete(education.id)}
                >
                  <DeleteIcon style={{ color: '#9F9FB0' }} />
                </Stack>
                <Stack style={{ cursor: 'pointer' }} onClick={handleAdd}>
                  <AddIcon style={{ color: '#9F9FB0' }} />
                </Stack>
              </Stack>
            )}
          </AccountGrid>
        );
      })}
    </>
  );
};

export default Education;
