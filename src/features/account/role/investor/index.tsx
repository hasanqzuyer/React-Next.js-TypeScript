import React, { useState } from 'react';

import {
  AccountChange,
  AccountMain,
  AccountSpan,
  AccountContainer,
  AccountForm,
  AccountStack,
  AccountHeadline,
  AccountGrid,
  ApplicationContainer,
} from 'features/account/style';
import { Button, Card, Checkbox, Input } from 'components/ui';
import { ChangePasswordModal } from 'features/account/role/investor/elements';
import { useModal } from 'hooks';
import { Tabs } from 'components/custom';
import { Stack } from 'components/system';
import { AddIcon, DeleteIcon } from 'components/svg';

const AccountPage = ({ ...props }) => {
  const [state, setState] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [cpModal, openCpModal, closeCpModal] = useModal(false);

  const [tabs, setTabs] = useState(0);

  return (
    <Stack>
      <Tabs tabs={['Info', 'Application']} value={tabs} onValue={setTabs} />
      <AccountMain {...props}>
        <Stack>
          {tabs === 0 && (
            <ApplicationContainer>
              <AccountGrid>
                <Input
                  type="text"
                  label="First Name"
                  value={state.firstName}
                  onValue={(firstName) => setState({ ...state, firstName })}
                  disabled
                />
                <Input
                  type="text"
                  label="Last Name"
                  value={state.lastName}
                  onValue={(lastName) => setState({ ...state, lastName })}
                  disabled
                />
                <Input
                  type="text"
                  label="Email"
                  value={state.email}
                  onValue={(email) => setState({ ...state, email })}
                  disabled
                />
                <AccountChange>
                  <Input
                    type="text"
                    label="Password"
                    placeholder="**********"
                    value={state.password}
                    onValue={(password) => setState({ ...state, password })}
                    disabled
                  />
                  <AccountSpan onClick={openCpModal}>
                    Change Password
                  </AccountSpan>
                </AccountChange>
              </AccountGrid>
            </ApplicationContainer>
          )}
          {tabs === 1 && (
            <ApplicationContainer>
              <Stack>
                <AccountHeadline>Work Experience</AccountHeadline>
                <AccountGrid style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    label="Job Title"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Company"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Location"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Stack
                    direction="horizontal"
                    style={{ position: 'relative' }}
                  >
                    <Input
                      type="date"
                      label="From"
                      placeholder="Please Select"
                      value=""
                      onValue={() => {}}
                    />
                    <Input
                      type="date"
                      label="To"
                      placeholder="Please Select"
                      value=""
                      onValue={() => {}}
                    />
                    <Checkbox
                      label="I still work here."
                      style={{
                        position: 'absolute',
                        right: '0',
                        bottom: '-25px',
                      }}
                    />
                  </Stack>
                  <Input
                    type="text"
                    label="Role Description"
                    placeholder="Please Enter"
                    value=""
                    onValue={() => {}}
                    style={{ gridColumn: '1/3' }}
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
                    <DeleteIcon style={{ color: '#9F9FB0' }} />
                    <AddIcon style={{ color: '#9F9FB0' }} />
                  </Stack>
                </AccountGrid>
                <AccountHeadline>Education</AccountHeadline>
                <AccountGrid style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    label="School or University"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Degree"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Field of Study"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Stack direction="horizontal">
                    <Input
                      type="date"
                      label="From"
                      placeholder="Please Select"
                      value=""
                      onValue={() => {}}
                    />
                    <Input
                      type="date"
                      label="To"
                      placeholder="Please Select"
                      value=""
                      onValue={() => {}}
                    />
                  </Stack>
                  <Input
                    type="select"
                    label="Overall GPA"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
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
                    <DeleteIcon style={{ color: '#9F9FB0' }} />
                    <AddIcon style={{ color: '#9F9FB0' }} />
                  </Stack>
                </AccountGrid>
                <AccountHeadline>Skills</AccountHeadline>
                <AccountGrid>
                  <Input
                    type="select"
                    label="Type to Add Skills"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                </AccountGrid>
                <AccountHeadline>Social Media</AccountHeadline>
                <AccountGrid>
                  <Input
                    type="text"
                    label="Instagram"
                    placeholder="Please Enter"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="text"
                    label="LinkedIn"
                    placeholder="Please Enter"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="text"
                    label="TikTok"
                    placeholder="Please Enter"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="text"
                    label="Website"
                    placeholder="Please Enter"
                    value=""
                    onValue={() => {}}
                  />
                </AccountGrid>
                <AccountHeadline>House Preferences</AccountHeadline>
                <AccountGrid>
                  <Input
                    type="select"
                    label="Theme"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Skills of Others"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Location"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Language"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="min-max"
                    label="Monthly Rent"
                    value={{ min: '', max: '' }}
                    onValue={() => {}}
                  />
                  <Input
                    type="min-max"
                    label="Age"
                    value={{ min: '', max: '' }}
                    onValue={() => {}}
                  />
                  <Input
                    type="min-max"
                    label="Tenants per House"
                    value={{ min: '', max: '' }}
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Interests and Hobbies"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                  <Input
                    type="select"
                    label="Diet"
                    placeholder="Please Select"
                    value=""
                    onValue={() => {}}
                  />
                </AccountGrid>
                <AccountGrid>
                  <Input
                    type="text"
                    label="Motivation"
                    placeholder="Please Enter"
                    value=""
                    onValue={() => {}}
                    style={{ gridColumn: '1/3' }}
                  />
                </AccountGrid>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '130px', alignSelf: 'flex-end' }}
                >
                  Save
                </Button>
              </Stack>
            </ApplicationContainer>
          )}
        </Stack>

        {cpModal && <ChangePasswordModal onClose={closeCpModal} />}
      </AccountMain>
    </Stack>
  );
};

export default AccountPage;
