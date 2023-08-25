import React, { Children, useEffect, useState } from 'react';
import { Modal, RichTextEditor, Tabs } from 'components/custom';
import { TExportFinanceModalProps } from 'features/finance/elements/export-finance-modal/types';
import {
  AddProjectModalMain,
  AddProjectHeadline,
  AddProjectDocumentPlaceholder,
  ISpan,
  ImageUploadButton,
} from 'features/opportunities/role/admin/elements/add-project-modal/style';
import { Button, Checkbox, Input, Label } from 'components/ui';
import { GridCell, Stack } from 'components/system';
import { DeleteIcon, UploadIcon } from 'components/svg';
import { pick } from '@costorgroup/file-manager';
import { THouseImage } from './types';
import { useDebounce, useModal, useSnackbar } from 'hooks';
import UploadedFileModal from '../uploaded-file-modal';
import ImageApi from 'api/images';
import DocumentApi from 'api/documents';
import { IHouse, TCreateHouse } from 'api/houses/types';
import { getLocations } from 'utilities/locations';
import { getHouseTheme } from 'utilities/houseTheme';
import { HouseAPI } from 'api';

const AddHouseProjectModal = ({
  onClose,
  ...props
}: TExportFinanceModalProps) => {
  const [tab, setTab] = useState(0);
  const { push } = useSnackbar();
  const [photos, setPhotos] = useState<THouseImage[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [modal, modalOpen, modalClose] = useModal(false);
  const [docModal, docModalOpen, docModalClose] = useModal(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [activeDocIdx, setActiveDocIdx] = useState<number>(0);
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
    status: '',
    marketType: '',
    thumbnailId: null,
  });

  const handlePhotos = async () => {
    const file: any = await pick({
      accept: 'image/jpg, image/jpeg, image/png',
    });

    try {
      await ImageApi.fileUpload(file, 1).then(async (data) => {
        const presignedUrl = await ImageApi.fileDownload(data.key);

        if (
          presignedUrl &&
          presignedUrl.data &&
          file &&
          file.name &&
          file.type &&
          data &&
          data.id
        ) {
          setPhotos((prev: THouseImage[]) => [
            ...prev,
            {
              presignedUrl: presignedUrl.data,
              name: file.name,
              type: file.type,
              id: data.id,
              url: data.url,
            },
          ]);
          push('File successfully uploaded.', { variant: 'success' });
        }
      });
    } catch (error: any) {
      push('File upload failed.', { variant: 'error' });
    }
  };

  const handleDocuments = async () => {
    const file: any = await pick({
      accept: 'application/pdf',
    });

    try {
      await DocumentApi.fileUpload(file, 1).then(async (data) => {
        const presignedUrl = await DocumentApi.fileDownload(data.key);

        if (
          presignedUrl &&
          presignedUrl.data &&
          file &&
          file.name &&
          file.type &&
          data &&
          data.id
        ) {
          setDocuments((prev: THouseImage[]) => [
            ...prev,
            {
              presignedUrl: presignedUrl.data,
              name: file.name,
              type: file.type,
              id: data.id,
              url: data.url,
            },
          ]);
          push('File successfully uploaded.', { variant: 'success' });
        }
      });
    } catch (error: any) {
      push('File upload failed.', { variant: 'error' });
    }
  };

  const handleDeletePhoto = (id: number) => {
    try {
      ImageApi.fileDelete(id).then(() => {
        setPhotos((prev: THouseImage[]) =>
          prev.filter((item: THouseImage) => item.id !== id)
        );
        push('File successfully deleted.', { variant: 'success' });
      });
    } catch (error: any) {
      push('File delete failed.', { variant: 'error' });
    }
  };

  const handleDeleteDocument = (id: number) => {
    try {
      ImageApi.fileDelete(id).then(() => {
        setDocuments((prev: THouseImage[]) =>
          prev.filter((item: THouseImage) => item.id !== id)
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
      let data = {
        ...houseData,
        status: houseData.status ? houseData.status.toUpperCase() : '',
        marketType: houseData.marketType
          ? houseData.marketType.toUpperCase()
          : '',
      };
      await HouseAPI.create(data).then((res) => {
        const body = { houseId: res.id };
        photos.forEach(async (img: THouseImage) => {
          await ImageApi.updateFile(body, img.id);
        });
        documents.forEach(async (dic: THouseImage) => {
          await DocumentApi.updateFile(body, dic.id);
        });
      });
      onClose();
      push('Successfully created house project.', { variant: 'error' });
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
              placeholder="Please Enter"
              value={houseData?.name}
              onValue={(name) => setHouseData({ ...houseData, name })}
            />
            <Input
              type="select"
              label="Location"
              placeholder="Please Select"
              onSearch={debouncedLocation}
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
            />
            <Input
              type="number"
              label="Total Spots"
              placeholder="Please Enter"
              value={houseData?.totalSpots}
              onValue={(totalSpots) =>
                setHouseData({ ...houseData, totalSpots })
              }
            />
            <Input
              type="number"
              label="Available Spots"
              placeholder="Please Enter"
              value={houseData?.availableSpots}
              onValue={(availableSpots) =>
                setHouseData({ ...houseData, availableSpots })
              }
            />
            <Input
              type="number"
              label="Rent"
              placeholder="Please Enter"
              value={houseData?.rent}
              onValue={(rent) => setHouseData({ ...houseData, rent })}
            />
            <Input
              type="select"
              label="Theme"
              placeholder="Please Select"
              onSearch={debouncedTheme}
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
            />
            <Input
              type="select"
              label="Status"
              placeholder="Please Select"
              options={[
                {
                  value: 'Initiated',
                  label: 'Initiated',
                },
                {
                  value: 'Live',
                  label: 'Live',
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
              type="select"
              label="Market Type"
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
              ]}
              value={
                houseData.marketType
                  ? {
                      label: houseData.marketType,
                      value: houseData.marketType,
                    }
                  : null
              }
              onValue={(marketType) =>
                setHouseData({
                  ...houseData,
                  marketType: marketType ? marketType.value : marketType,
                })
              }
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
              photos.map((item: THouseImage, idx: number) => {
                const { presignedUrl, name, type, id } = item;
                return (
                  <>
                    <AddProjectDocumentPlaceholder>
                      <ImageUploadButton
                        onClick={() => {
                          modalOpen();
                          setActivePhotoIdx(idx);
                        }}
                        key={id}
                      >
                        {name}
                      </ImageUploadButton>
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
                    </AddProjectDocumentPlaceholder>
                    {modal && presignedUrl && activePhotoIdx === idx && (
                      <UploadedFileModal
                        onClose={modalClose}
                        name={name}
                        url={presignedUrl}
                        type={type}
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
              documents.map((item: THouseImage, idx: number) => {
                const { presignedUrl, name, type, id } = item;
                return (
                  <>
                    <AddProjectDocumentPlaceholder>
                      <ImageUploadButton
                        onClick={() => {
                          docModalOpen();
                          setActiveDocIdx(idx);
                        }}
                        key={id}
                      >
                        {name}
                      </ImageUploadButton>
                      <ISpan onClick={() => handleDeleteDocument(id)}>
                        <DeleteIcon />
                      </ISpan>
                    </AddProjectDocumentPlaceholder>
                    {docModal && presignedUrl && activeDocIdx === idx && (
                      <UploadedFileModal
                        onClose={docModalClose}
                        name={name}
                        url={presignedUrl}
                        type={type}
                      />
                    )}
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
