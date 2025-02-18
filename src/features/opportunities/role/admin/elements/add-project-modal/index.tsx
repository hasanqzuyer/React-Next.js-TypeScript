import React, { Children, useEffect, useState } from 'react';
import { Modal, RichTextEditor, Tabs } from 'components/custom';
import {
  AddProjectModalMain,
  AddProjectHeadline,
  AddProjectDocumentPlaceholder,
  ISpan,
  ImageUploadButton,
  ImageLinkContainer,
  ThumbnailContainer,
} from 'features/opportunities/role/admin/elements/add-project-modal/style';
import { Button, Checkbox, Input, Label } from 'components/ui';
import { GridCell, Stack } from 'components/system';
import { DeleteIcon, UploadIcon } from 'components/svg';
import { pick } from '@costorgroup/file-manager';
import { TAddHousesModalProps } from './types';
import { useDebounce, useModal, useSnackbar } from 'hooks';
import UploadedFileModal from '../uploaded-file-modal';
import ImageApi from 'api/images';
import DocumentApi from 'api/documents';
import { TCreateHouse } from 'api/houses/types';
import { getLocations } from 'utilities/locations';
import { getHouseTheme } from 'utilities/houseTheme';
import { HouseAPI } from 'api';
import { TImage } from 'api/images/types';
import { TDocument } from 'api/documents/types';
import Project from 'constants/project';

const AddHouseProjectModal = ({
  onClose,
  refresh,
  ...props
}: TAddHousesModalProps) => {
  const [tab, setTab] = useState(0);
  const { push } = useSnackbar();
  const [photos, setPhotos] = useState<TImage[]>([]);
  const [documents, setDocuments] = useState<TDocument[]>([]);
  const [modal, modalOpen, modalClose] = useModal(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [locations, setLocations] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [houseData, setHouseData] = useState<TCreateHouse>({
    name: '',
    location: '',
    totalSpots: null,
    availableSpots: null,
    rent: null,
    theme: '',
    info: '',
    status: 'Primary',
    currency: '',
    thumbnailId: null,
  });

  const isDisabled =
    !houseData.name ||
    !houseData.location ||
    !houseData.totalSpots ||
    !houseData.availableSpots ||
    !houseData.theme ||
    !houseData.rent ||
    !houseData.thumbnailId ||
    photos.length === 0;

  const handlePhotos = async () => {
    const files: any = await pick({
      accept: 'image/jpg, image/jpeg, image/png',
      multiple: true,
    });

    try {
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        await ImageApi.fileUpload(element).then(async (data) => {
          setPhotos((prev: TImage[]) => [...prev, { ...data }]);
        });
      }
      push('Images successfully uploaded.', { variant: 'success' });
    } catch (error: any) {
      push('Images upload failed.', { variant: 'error' });
    }
  };

  const handleDocuments = async () => {
    const files: any = await pick({
      accept: 'application/pdf',
      multiple: true,
    });

    try {
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        await DocumentApi.fileUpload(element).then(async (data) => {
          setDocuments((prev: TDocument[]) => [...prev, { ...data }]);
        });
      }
      push('Documents successfully uploaded.', { variant: 'success' });
    } catch (error: any) {
      push('Documents upload failed.', { variant: 'error' });
    }
  };

  const handleDeletePhoto = (id: number) => {
    try {
      ImageApi.fileDelete(id).then(() => {
        setPhotos((prev: TImage[]) =>
          prev.filter((item: TImage) => item.id !== id)
        );
        push('File successfully deleted.', { variant: 'success' });
      });
    } catch (error: any) {
      push('File delete failed.', { variant: 'error' });
    }
  };

  const handleDeleteDocument = (id: number) => {
    try {
      DocumentApi.fileDelete(id).then(() => {
        setDocuments((prev: TDocument[]) =>
          prev.filter((item: TDocument) => item.id !== id)
        );
        push('File successfully deleted.', { variant: 'success' });
      });
    } catch (error: any) {
      push('File delete failed.', { variant: 'error' });
    }
  };
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

  const getThemeOptions = async (searchTerm: string = '') => {
    const result = getHouseTheme(searchTerm);
    setThemes(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const debouncedLocation = useDebounce(getLocationOptions, 100);
  const debouncedTheme = useDebounce(getThemeOptions, 100);

  useEffect(() => {
    getLocationOptions();
    getThemeOptions();
  }, []);

  const handleAddProject = async () => {
    try {
      const house = await HouseAPI.create(houseData);
      const body = { houseId: house.id };
      for (let i = 0; i < photos.length; i++) {
        const element = photos[i];
        await ImageApi.updateFile(body, element.id);
      }
      for (let i = 0; i < documents.length; i++) {
        const element = documents[i];
        await DocumentApi.updateFile(body, element.id);
      }
      onClose();
      refresh();
      push('Successfully created house project.', { variant: 'success' });
    } catch {
      push('Something went wrong when create house project.', {
        variant: 'error',
      });
    }
  };

  return (
    <Modal
      size="medium"
      title="Add Project"
      actions={Children.toArray([
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled={isDisabled}
          onClick={handleAddProject}
        >
          Add
        </Button>,
      ])}
      onClose={onClose}
      {...props}
    >
      <Stack>
        <Tabs tabs={['Overview', 'Documents']} value={tab} onValue={setTab} />
        {tab === 0 && (
          <AddProjectModalMain columns={2}>
            <Input
              type="text"
              label="Name"
              required
              placeholder="Please Enter"
              value={houseData?.name}
              onValue={(name) => setHouseData({ ...houseData, name })}
              validators={[
                {
                  message: 'Name is required',
                  validator: (name) => {
                    const v = name as string;
                    if (v) return true;
                    return false;
                  },
                },
              ]}
            />
            <Input
              type="select"
              label="Location"
              placeholder="Please Select"
              onSearch={debouncedLocation}
              required
              options={locations}
              value={
                houseData.location
                  ? {
                      label: houseData.location,
                      value: houseData.location,
                    }
                  : null
              }
              onValue={(location) =>
                setHouseData({
                  ...houseData,
                  location: location ? location.value : location,
                })
              }
              validators={[
                {
                  message: 'Location is required',
                  validator: (value) => {
                    const v = value as string;
                    if (v) return true;
                    return false;
                  },
                },
              ]}
            />
            <Input
              type="number"
              label="Total Spots"
              required
              placeholder="Please Enter"
              value={houseData?.totalSpots}
              onValue={(totalSpots) =>
                setHouseData({ ...houseData, totalSpots })
              }
              validators={[
                {
                  message: 'Total Spots is required',
                  validator: (value) => {
                    const v = value as number;
                    if (v) return true;
                    return false;
                  },
                },
              ]}
            />
            <Input
              type="number"
              required
              label="Available Spots"
              placeholder="Please Enter"
              value={houseData?.availableSpots}
              onValue={(availableSpots) =>
                setHouseData({ ...houseData, availableSpots })
              }
              validators={[
                {
                  message: 'Available Spots is required',
                  validator: (value) => {
                    const v = value as string;
                    if (v) return true;
                    return false;
                  },
                },
              ]}
            />
            <Input
              type="number"
              label="Rent"
              required
              placeholder="Please Enter"
              value={houseData?.rent}
              onValue={(rent) => setHouseData({ ...houseData, rent })}
              validators={[
                {
                  message: 'Rent is required',
                  validator: (value) => {
                    const v = value as string;
                    if (v) return true;
                    return false;
                  },
                },
              ]}
            />
            <Input
              type="select"
              required
              label="Theme"
              placeholder="Please Select"
              options={themes}
              value={
                houseData.theme
                  ? {
                      label: houseData.theme,
                      value: houseData.theme,
                    }
                  : null
              }
              onValue={(theme) =>
                setHouseData({
                  ...houseData,
                  theme: theme ? theme.value : theme,
                })
              }
              validators={[
                {
                  message: 'Theme required',
                  validator: (value) => {
                    const v = value as string;
                    if (v) return true;
                    return false;
                  },
                },
              ]}
            />
            <Input
              type="select"
              label="Status"
              placeholder="Please Select"
              options={[
                {
                  value: 'Primary',
                  label: 'Primary',
                },
                {
                  value: 'Secondary',
                  label: 'Secondary',
                },
                {
                  value: 'Completed',
                  label: 'Completed',
                },
              ]}
              value={
                houseData.status
                  ? {
                      label: houseData.status,
                      value: houseData.status,
                    }
                  : null
              }
              onValue={(status) =>
                setHouseData({
                  ...houseData,
                  status: status ? status.value : status,
                })
              }
            />
            <Input
              type="text"
              label="Currency"
              required
              placeholder="Please Enter"
              value={houseData?.currency}
              onValue={(currency) => setHouseData({ ...houseData, currency })}
              validators={[
                {
                  message: 'Currency is required',
                  validator: (currency) => {
                    const v = currency as string;
                    if (v) return true;
                    return false;
                  },
                },
              ]}
            />
            <GridCell columnSpan={2}>
              <Stack>
                <Label style={{ color: '#7E839F', marginBottom: '-1.25rem' }}>
                  Info
                </Label>
                <RichTextEditor
                  name="info"
                  value={houseData.info}
                  onChange={setHouseData}
                />
              </Stack>
            </GridCell>
          </AddProjectModalMain>
        )}
        {tab === 1 && (
          <AddProjectModalMain columns={1}>
            <AddProjectHeadline>
              Images
              <ISpan onClick={handlePhotos}>
                <UploadIcon />
              </ISpan>
            </AddProjectHeadline>

            {photos && photos.length ? (
              photos.map((item: TImage, idx: number) => {
                const { key, name, id } = item;
                console.log(name.length);
                return (
                  <>
                    <AddProjectDocumentPlaceholder>
                      <ImageLinkContainer>
                        <ImageUploadButton
                          onClick={() => {
                            modalOpen();
                            setActivePhotoIdx(idx);
                          }}
                          key={id}
                        >
                        {/* {name.length > 20 ? name.slice(0, 20) + '...' : name} */}
                        {name}
                        </ImageUploadButton>
                      </ImageLinkContainer>
                      <ThumbnailContainer>
                        <Checkbox
                          label="Mark as Thumbnail"
                          value={houseData.thumbnailId === id}
                          onValue={(value) =>
                            setHouseData((data: any) => ({
                              ...data,
                              thumbnailId: value ? id : null,
                            }))
                          }
                        />
                        <ISpan onClick={() => handleDeletePhoto(id)}>
                          <DeleteIcon />
                        </ISpan>
                      </ThumbnailContainer>
                    </AddProjectDocumentPlaceholder>
                    {modal && key && activePhotoIdx === idx && (
                      <UploadedFileModal
                        onClose={modalClose}
                        name={name}
                        url={`${Project.apis.v1}/public/images/${key}`}
                        type={'image'}
                      />
                    )}
                  </>
                );
              })
            ) : (
              <AddProjectDocumentPlaceholder />
            )}

            <AddProjectHeadline>
              Documents
              <ISpan onClick={handleDocuments}>
                <UploadIcon />
              </ISpan>
            </AddProjectHeadline>

            {documents && documents.length ? (
              documents.map((item: TDocument, idx: number) => {
                const { key, name, id } = item;
                return (
                  <>
                    <AddProjectDocumentPlaceholder>
                      <ImageUploadButton
                        onClick={() => {
                          window.open(
                            `${Project.apis.v1}/public/documents/${key}`,
                            '_blank'
                          );
                        }}
                        key={id}
                      >
                        {name}
                      </ImageUploadButton>
                      <ISpan onClick={() => handleDeleteDocument(id)}>
                        <DeleteIcon />
                      </ISpan>
                    </AddProjectDocumentPlaceholder>
                  </>
                );
              })
            ) : (
              <AddProjectDocumentPlaceholder />
            )}
          </AddProjectModalMain>
        )}
      </Stack>
    </Modal>
  );
};

export default AddHouseProjectModal;
