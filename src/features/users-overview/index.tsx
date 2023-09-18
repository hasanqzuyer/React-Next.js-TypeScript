import React, { useState, useEffect } from 'react';
import {
  ApplicationContainer,
  AccountHeadline,
  AccountGrid,
  SkillGrid,
  PreferenceEditButton,
  PreferenceHeadline,
} from 'features/users-overview/styles';
import { Button, Input, Card } from 'components/ui';
import { Stack } from 'components/system';
import { Tabs } from 'components/custom';
import UsersAPI from 'api/users';
import { IUser } from 'api/users/types';
import { useDebounce, useSnackbar } from 'hooks';
import { getLocations } from 'utilities/locations';
import { getNationalities } from 'utilities/nationalities';
import { getLanguages } from 'utilities/languages';
import { getHouseTheme } from 'utilities/houseTheme';
import { getSkillsOfOthers } from 'utilities/skillsOfOthers';
import { getInterestsAndHobbies } from 'utilities/interests';
import { getDiets } from 'utilities/diets';
import WorkExperience from './workExperiences';
import Education from './educations';
import { getSkills } from 'utilities/skills';
import { ISocialMedia } from 'api/socialMedia/types';
import SocialMediaAPI from 'api/socialMedia';
import HousePreferenceApi from 'api/housePreference';
import { birthDateSchema } from 'utilities/validators';
import { EditIcon } from 'components/svg';

const OverviewPage = (props: any) => {
  const { userId } = props;
  const [tabs, setTabs] = useState(0);
  const { push } = useSnackbar();
  const [infoHasChanged, setInfoHasChanged] = useState<boolean>(false);
  const [infoSaving, setInfoSaving] = useState<boolean>(false);
  const [socialMediaHasChanged, setSocialMediaHasChanged] =
    useState<boolean>(false);
  const [socialMediaSaving, setSocialMediaSaving] = useState<boolean>(false);
  const [expHasChanged, setExpHasChanged] = useState<boolean>(false);
  const [expSaving, setExpSaving] = useState<boolean>(false);
  const [eduHasChanged, setEduHasChanged] = useState<boolean>(false);
  const [eduSaving, setEduSaving] = useState<boolean>(false);
  const [hprefHasChanged, setHprefHasChanged] = useState<boolean>(false);
  const [hprefSaving, setHprefSaving] = useState<boolean>(false);
  const [workIssuedArrays, setWorkIssuedArrays] = useState<any[]>([]);
  const [eduIssuedArrays, setEduIssuedArrays] = useState<any[]>([]);
  const [saveCount, setCount] = useState<number>(0);

  // Viktor
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setCount(1);
  };

  const [info, setInfo] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    nationality: '',
    dateOfBirth: '',
    language: [],
    skills: [],
  });

  const [workExperiences, setWorkExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [socialMedia, setSocialMedia] = useState<ISocialMedia>({
    id: -1,
    linkedin: '',
    tiktok: '',
    instagram: '',
    website: '',
    ownerId: userId,
    createdAt: '',
    updatedAt: '',
  });
  const [housePreference, setHousePreference] = useState<any>({
    id: -1,
    theme: [],
    skillsOfOthers: [],
    location: '',
    language: '',
    monthlyRentMax: 0,
    monthlyRentMin: 0,
    ageMax: 0,
    ageMin: 0,
    tenantsMax: 0,
    tenantsMin: 0,
    interestsHobbies: [],
    ownerId: userId,
    diet: '',
    motivation: '',
    createdAt: '',
    updatedAt: '',
  });

  const [errors, setErrors] = useState([false]);

  const handleErrors = (index: number) => (value: boolean) => {
    setErrors((x) => x.map((a, b) => (b === index ? value : a)));
  };

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  useEffect(() => {
    const isDisable =
      !info.firstName ||
      !info.lastName ||
      !!errors.find((x) => x) ||
      workIssuedArrays.length > 0 ||
      eduIssuedArrays.length > 0;

    const isUnDisabled =
      eduHasChanged ||
      expHasChanged ||
      infoHasChanged ||
      socialMediaHasChanged ||
      hprefHasChanged;

    if (isUnDisabled && !isDisable) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    workIssuedArrays,
    info,
    eduIssuedArrays,
    housePreference,
    expHasChanged,
    infoHasChanged,
    eduHasChanged,
    socialMediaHasChanged,
    hprefHasChanged,
    errors,
  ]);

  const getUserById = async (id: any) => {
    if (!id) return;
    const data: IUser = await UsersAPI.getUser(id);

    setInfo((info: any) => ({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      nationality: data.nationality,
      dateOfBirth: data.dateOfBirth,
      language: data.language
        ? data.language.split(',').map((name: string) => ({
            value: name,
            label: name,
          }))
        : [],
      location: data.location,
      skills: data.skills
        ? data.skills.split(',').map((name: string) => ({
            value: name,
            label: name,
          }))
        : [],
    }));

    setWorkExperiences(data.experiences);
    setEducations(data.educations);

    if (data.socialMedia?.length > 0) {
      setSocialMedia(data.socialMedia[0]);
    }

    if (data.housePreference?.length > 0) {
      let houseprf: any = data.housePreference[0];
      houseprf.skillsOfOthers = houseprf.skillsOfOthers
        ? houseprf.skillsOfOthers.split(',').map((name: string) => ({
            value: name,
            label: name,
          }))
        : [];
      houseprf.interestsHobbies = houseprf.interestsHobbies
        ? houseprf.interestsHobbies.split(',').map((name: string) => ({
            value: name,
            label: name,
          }))
        : [];
      houseprf.theme = houseprf.theme
        ? houseprf.theme.split(',').map((name: string) => ({
            value: name,
            label: name,
          }))
        : [];
      houseprf.location = houseprf.location
        ? houseprf.location.split('@').map((name: string) => ({
          value: name,
          label: name,
        }))
      : [];

      houseprf.language = houseprf.language
      ? houseprf.language.split(',').map((name: string) => ({
        value: name,
        label: name,
      }))
      : [];
      setHousePreference(houseprf);
    }
  };

  const [locations, setLocations] = useState<any[]>([]);
  const [preferenenceLocations, setPreferenceLocations] = useState<any[]>([]);
  const [nationalities, setNationalities] = useState<any[]>([]);
  const [language, setLanguages] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [skillsOfthers, setSkillsOfOthers] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);

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

  const getPreferenceLocations = async (searchTerm: string = '') => { 
    const result = getLocations(searchTerm);
    setPreferenceLocations(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  }

  const getNationalityOptions = async (searchTerm: string = '') => {
    const result = getNationalities(searchTerm);
    setNationalities(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getLanguageOptions = async (searchTerm: string = '') => {
    const result = getLanguages(searchTerm);
    setLanguages(
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

  const getSkillsOfOtherOptions = async (searchTerm: string = '') => {
    const result = getSkillsOfOthers(searchTerm);
    setSkillsOfOthers(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getSkillsOptions = async (searchTerm: string = '') => {
    const result = getSkills(searchTerm);
    setSkills(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getInterestsOptions = async (searchTerm: string = '') => {
    const result = getInterestsAndHobbies(searchTerm);
    setInterests(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getDietsOptions = async (searchTerm: string = '') => {
    const result = getDiets(searchTerm);
    setDiets(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const debouncedPreferenceLocation = useDebounce(getPreferenceLocations, 100);
  const debouncedLocation = useDebounce(getLocationOptions, 100);
  const debouncedNationalities = useDebounce(getNationalityOptions, 100);
  const debouncedLanguages = useDebounce(getLanguageOptions, 100);
  const debouncedSkillsOfOthers = useDebounce(getSkillsOfOtherOptions, 100);
  const debouncedSkills = useDebounce(getSkillsOptions, 100);

  useEffect(() => {
    getLocationOptions();
    getPreferenceLocations();
    getNationalityOptions();
    getLanguageOptions();
    getDietsOptions();
    getInterestsOptions();
    getThemeOptions();
    getSkillsOfOtherOptions();
    getSkillsOptions();
  }, []);

  const updateUserInfo = async () => {
    try {
      const language = info.language.map((item: any) => item.value).join(',');
      const skills = info.skills.map((item: any) => item.value).join(',');
      let data = { ...info, language, skills };
      await UsersAPI.updateSingleUser(userId, data).then(() => {});
      setInfoSaving(false);
      setInfoHasChanged(false);
    } catch {
      push('Something went wrong when update user info.', { variant: 'error' });
      setInfoSaving(false);
    }
  };

  const saveSocialMedia = async () => {
    try {
      if (socialMedia.id === -1) {
        await SocialMediaAPI.createSocialMedia(socialMedia).then(() => {});
      } else {
        await SocialMediaAPI.updateSocialMedia(
          socialMedia,
          socialMedia.id
        ).then(() => {});
      }
      setSocialMediaHasChanged(false);
      setSocialMediaSaving(false);
      push('Updated user info successfully', {
        variant: 'success',
      });
    } catch {
      push('Something went wrong when save social media.', {
        variant: 'error',
      });
      setSocialMediaSaving(false);
    }
  };

  const saveHousePreference = async () => {
    try {
      const skillsOfOthers = housePreference.skillsOfOthers
        .map((item: any) => item.value)
        .join(',');
      const interestsHobbies = housePreference.interestsHobbies
        .map((item: any) => item.value)
        .join(',');
      const theme = housePreference.theme
        .map((item: any) => item.value)
        .join(',');
      const location = housePreference.location
        .map((item: any) => item.value)
        .join('@');

      const language = housePreference.language
        .map((item: any) => item.value)
        .join(',');
      let data = {
        ...housePreference,
        skillsOfOthers,
        interestsHobbies,
        theme,
        location,
        language
      };
      if (housePreference.id === -1) {
        await HousePreferenceApi.createHousePreference(data).then(() => {});
      } else {
        await HousePreferenceApi.updateHousePreference(
          data,
          housePreference.id
        ).then(() => {});
      }
      setHprefHasChanged(false);
      setHprefSaving(false);
    } catch {
      push('Something went wrong when save house preference.', {
        variant: 'error',
      });
      setHprefSaving(false);
    }
  };

  const handleSave = () => {
    if (infoHasChanged) {
      setInfoSaving(true);
      updateUserInfo();
    }
    if (socialMediaHasChanged) {
      setSocialMediaSaving(true);
      saveSocialMedia();
    }
    if (expHasChanged) {
      setExpSaving(true);
    }
    if (eduHasChanged) {
      setEduSaving(true);
    }
    if (hprefHasChanged) {
      setHprefSaving(true);
      saveHousePreference();
    }
  };

  useEffect(() => {
    if (saveCount > 1) {
      push('Successfully updated', { variant: 'success' });
    }
  }, [saveCount]);
  useEffect(() => {
    if (
      !expSaving &&
      !infoSaving &&
      !eduSaving &&
      !hprefSaving &&
      !socialMediaSaving &&
      userId
    ) {
      setCount((count) => count + 1);
      getUserById(userId);
    }
  }, [
    expSaving,
    infoSaving,
    eduSaving,
    hprefSaving,
    socialMediaSaving,
    userId,
  ]);

  const handleChangeInfo = (name: string, value: any) => {
    setInfo({ ...info, [name]: value });
    setInfoHasChanged(true);
  };

  const handleChangeSocialMedia = (name: string, value: string) => {
    setSocialMedia({ ...socialMedia, [name]: value });
    setSocialMediaHasChanged(true);
  };

  const handleChangeHousePreference = (name: string, value: string) => {
    setHousePreference({ ...housePreference, [name]: value });
    setHprefHasChanged(true);
  };

  const handleChangeMinMaxHousePreference = (
    minName: string,
    maxName: string,
    value: any
  ) => {
    setHousePreference({
      ...housePreference,
      [minName]: value.min,
      [maxName]: value.max,
    });
    setHprefHasChanged(true);
  };

  return (
    <Stack>
      <Tabs tabs={['Info', 'Application']} value={tabs} onValue={setTabs} />
      {tabs === 0 && (
        <Card>
          <ApplicationContainer>
            <Stack>
              <PreferenceHeadline>
                Info
                <PreferenceEditButton>
                  <EditIcon onClick={handleEditClick} />
                </PreferenceEditButton>
              </PreferenceHeadline>
              <AccountGrid style={{ marginBottom: '36px' }}>
                <Input
                  type="text"
                  label="First Name"
                  placeholder="John"
                  disabled
                  value={info?.firstName}
                  onValue={(firstName) =>
                    handleChangeInfo('firstName', firstName)
                  }
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  value={info?.lastName}
                  disabled
                  onValue={(lastName) => handleChangeInfo('lastName', lastName)}
                />
                <Input
                  type="text"
                  label="Email"
                  placeholder="johndio@gmail.com"
                  value={info?.email}
                  onValue={() => {}}
                  disabled
                />
              </AccountGrid>
              <AccountGrid>
                <Input
                  type="select"
                  label="Location"
                  onSearch={debouncedLocation}
                  placeholder="Please Select"
                  disabled={!isEditing}
                  options={locations}
                  value={
                    info.location
                      ? {
                          label: info.location,
                          value: info.location,
                        }
                      : null
                  }
                  onValue={(location) =>
                    handleChangeInfo(
                      'location',
                      location ? location.value : location
                    )
                  }
                />
                <Input
                  type="select"
                  label="Nationality"
                  onSearch={debouncedNationalities}
                  placeholder="Please Select"
                  disabled={!isEditing}
                  options={nationalities}
                  value={
                    info.nationality
                      ? {
                          label: info.nationality,
                          value: info.nationality,
                        }
                      : null
                  }
                  onValue={(nationality) =>
                    handleChangeInfo(
                      'nationality',
                      nationality ? nationality.value : nationality
                    )
                  }
                />
                <Input
                  type="date"
                  label="Date of Birth"
                  disabled={!isEditing}
                  placeholder="Please Select"
                  errorCallback={handleErrors(0)}
                  value={info?.dateOfBirth}
                  onValue={(dateOfBirth) =>
                    handleChangeInfo('dateOfBirth', dateOfBirth)
                  }
                  validators={[
                    {
                      message: 'Please add date of birth!',
                      validator: (birthDate) => {
                        try {
                          birthDateSchema.validateSync({ birthDate });
                          return true;
                        } catch {
                          return false;
                        }
                      },
                    },
                  ]}
                />
                <Input
                  type="multiselect"
                  label="Languages"
                  onSearch={debouncedLanguages}
                  placeholder="Please Select"
                  disabled={!isEditing}
                  options={language}
                  isFilterActive
                  value={info.language}
                  onValue={(language) => handleChangeInfo('language', language)}
                />
              </AccountGrid>
              {!expSaving &&
              !infoSaving &&
              !eduSaving &&
              !socialMediaSaving &&
              !hprefSaving ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '130px', alignSelf: 'flex-end' }}
                  disabled={!isEditing || isDisabled}
                  onClick={handleSave}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '130px', alignSelf: 'flex-end' }}
                  disabled
                >
                  Saving...
                </Button>
              )}
            </Stack>
          </ApplicationContainer>
        </Card>
      )}
      {tabs === 1 && (
        <Card>
          <ApplicationContainer>
            <Stack>
              <PreferenceHeadline>
                Work Experience
                <PreferenceEditButton>
                  <EditIcon onClick={handleEditClick} />
                </PreferenceEditButton>
              </PreferenceHeadline>
              <WorkExperience
                userId={userId}
                totalData={workExperiences}
                setTotalData={setWorkExperiences}
                setHasChanged={setExpHasChanged}
                saving={expSaving}
                setSaving={setExpSaving}
                disabled={!isEditing}
                workIssuedArrays={workIssuedArrays}
                setWorkIssuedArrays={setWorkIssuedArrays}
              />
              <AccountHeadline>Education</AccountHeadline>
              <Education
                userId={userId}
                totalData={educations}
                setTotalData={setEducations}
                setHasChanged={setEduHasChanged}
                saving={eduSaving}
                setSaving={setEduSaving}
                disabled={!isEditing}
                eduIssuedArrays={eduIssuedArrays}
                setEduIssuedArrays={setEduIssuedArrays}
              />
              <AccountHeadline>Skills</AccountHeadline>
              <SkillGrid>
                <Input
                  type="multiselect"
                  label="Type to Add Skills"
                  placeholder="Please Select"
                  onSearch={debouncedSkills}
                  infoLabel="Maximum 5 skills"
                  isFilterActive
                  options={skills}
                  value={info.skills}
                  onValue={(skills) => {
                    if (skills.length <= 5) {
                      handleChangeInfo('skills', skills);
                    }
                  }}
                  disabled={!isEditing}
                />
              </SkillGrid>
              <AccountHeadline>Social Media</AccountHeadline>
              <AccountGrid>
                <Input
                  type="text"
                  label="Instagram"
                  placeholder="Please Enter"
                  value={socialMedia?.instagram}
                  onValue={(instagram) =>
                    handleChangeSocialMedia('instagram', instagram)
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="text"
                  label="LinkedIn"
                  placeholder="Please Enter"
                  value={socialMedia?.linkedin}
                  onValue={(linkedin) =>
                    handleChangeSocialMedia('linkedin', linkedin)
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="text"
                  label="TikTok"
                  placeholder="Please Enter"
                  value={socialMedia?.tiktok}
                  onValue={(tiktok) =>
                    handleChangeSocialMedia('tiktok', tiktok)
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="text"
                  label="Website"
                  placeholder="Please Enter"
                  value={socialMedia?.website}
                  onValue={(website) =>
                    handleChangeSocialMedia('website', website)
                  }
                  disabled={!isEditing}
                />
              </AccountGrid>
              <AccountHeadline>House Preferences</AccountHeadline>
              <AccountGrid>
                <Input
                  type="multiselect"
                  label="Theme"
                  placeholder="Please Select"
                  options={themes}
                  value={housePreference.theme}
                  infoLabel="Maximum 3 themes"
                  onValue={(theme) => {
                    if (theme.length <= 3) {
                      handleChangeHousePreference('theme', theme);
                    }
                  }}
                  disabled={!isEditing}
                />
                <Input
                  type="multiselect"
                  label="Skills of Others"
                  placeholder="Please Select"
                  options={skillsOfthers}
                  onSearch={debouncedSkillsOfOthers}
                  value={housePreference.skillsOfOthers}
                  onValue={(skillsOfOthers) => {
                    // if (skillsOfOthers.length <= 5) {
                      handleChangeHousePreference(
                        'skillsOfOthers',
                        skillsOfOthers
                      );
                    // }
                  }}
                  disabled={!isEditing}
                />
                <Input
                  type="multiselect"
                  label="Location"
                  placeholder="Please Select"
                  onSearch={debouncedPreferenceLocation}
                  options={preferenenceLocations}
                  value={housePreference.location}
                  onValue={(location) =>
                    handleChangeHousePreference(
                      'location',
                      location
                    )
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="multiselect"
                  label="Language"
                  placeholder="Please Select"
                  onSearch={debouncedLanguages}
                  options={language}
                  value={housePreference.language}
                  onValue={(language) =>
                    handleChangeHousePreference(
                      'language',
                      language
                    )
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="min-max"
                  label="Monthly Rent"
                  value={{
                    min: housePreference.monthlyRentMin,
                    max: housePreference.monthlyRentMax,
                  }}
                  onValue={(monthlyRent) =>
                    handleChangeMinMaxHousePreference(
                      'monthlyRentMin',
                      'monthlyRentMax',
                      monthlyRent
                    )
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="min-max"
                  label="Age"
                  value={{
                    min: housePreference.ageMin,
                    max: housePreference.ageMax,
                  }}
                  onValue={(age) =>
                    handleChangeMinMaxHousePreference('ageMin', 'ageMax', age)
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="min-max"
                  label="Tenants per House"
                  value={{
                    min: housePreference.tenantsMin,
                    max: housePreference.tenantsMax,
                  }}
                  onValue={(tenants) =>
                    handleChangeMinMaxHousePreference(
                      'tenantsMin',
                      'tenantsMax',
                      tenants
                    )
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="multiselect"
                  label="Interests and Hobbies"
                  placeholder="Please Select"
                  options={interests}
                  value={housePreference.interestsHobbies}
                  infoLabel="Maximum 3 interests and hobbies"
                  onValue={(interestsHobbies) => {
                    if (interestsHobbies.length <= 3) {
                      handleChangeHousePreference(
                        'interestsHobbies',
                        interestsHobbies
                      );
                    }
                  }}
                  disabled={!isEditing}
                />
                <Input
                  type="select"
                  label="Diet"
                  placeholder="Please Select"
                  options={diets}
                  value={
                    housePreference.diet
                      ? {
                          label: housePreference.diet,
                          value: housePreference.diet,
                        }
                      : null
                  }
                  onValue={(diet) =>
                    handleChangeHousePreference(
                      'diet',
                      diet ? diet.value : diet
                    )
                  }
                  disabled={!isEditing}
                />
              </AccountGrid>
              <AccountGrid>
                <Input
                  type="text"
                  label="Motivation"
                  placeholder="Please Enter"
                  value={housePreference?.motivation}
                  onValue={(motivation) =>
                    handleChangeHousePreference('motivation', motivation)
                  }
                  style={{ gridColumn: '1/3' }}
                  disabled={!isEditing}
                />
              </AccountGrid>
              {!expSaving &&
              !infoSaving &&
              !eduSaving &&
              !socialMediaSaving &&
              !hprefSaving ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '130px', alignSelf: 'flex-end' }}
                  disabled={!isEditing || isDisabled}
                  onClick={handleSave}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '130px', alignSelf: 'flex-end' }}
                  disabled
                >
                  Saving...
                </Button>
              )}
            </Stack>
          </ApplicationContainer>
        </Card>
      )}
    </Stack>
  );
};

export default OverviewPage;
