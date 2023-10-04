import React, { useState } from 'react';
import {
  HelpPageMain,
  HelpPageContact,
  HelpPageContactContainer,
  HelpPageIconWithTextContainer,
} from 'features/help/styles';
import { Button, Input } from 'components/ui';
import { IconWithText, Tabs } from 'components/custom';
import { Stack } from 'components/system';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EnvelopeIcon,
  LocationIcon,
  PhoneCallIcon,
} from 'components/svg';
import { HelpCollapse } from 'features/help/elements';
import { useSnackbar } from 'hooks';
import { UsersAPI } from 'api';

const HelpPage = () => {
  const [tab, setTab] = useState(0);

  const initialHelpFormData = {
    topic: null,
    subject: '',
    message: '',
  };

  const [helpFormData, setHelpFormData] = useState<any>(initialHelpFormData);

  const { push } = useSnackbar();

  const topicOptions = [
    { value: 0, label: 'Application & Housing' },
    { value: 1, label: 'Payments & Fees' },
    { value: 2, label: 'Technical Support' },
    { value: 3, label: 'Community & Policies' },
    { value: 4, label: 'General Inquiries' },
    // { value: 5, label: 'Donations & Affiliate Program' },
    // { value: 6, label: 'Benefits' },
    // { value: 7, label: 'General Inquiry' },
  ];

  //   //Technical Support
  //   Community & Policies
  // General Inquiries

  const isDisabled =
    !helpFormData.topic || !helpFormData.subject || !helpFormData.message;

  const sendSupportEmail = async () => {
    const { topic, subject, message } = helpFormData;

    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    try {
      if (topic && trimmedSubject.length && trimmedMessage.length) {
        const formBody = {
          subject: trimmedSubject,
          message: trimmedMessage,
          topic: topic.label,
        };
        await UsersAPI.contactAdmin(formBody);
        push('Message has been sent successfully.');

        setHelpFormData(initialHelpFormData);
      }
    } catch (error) {
      push('Error sending form', { variant: 'error' });
    }
  };

  return (
    <HelpPageMain>
      <Stack>
        <Tabs
          value={tab}
          onValue={setTab}
          tabs={['FAQ', 'Contact us']}
        />
        {tab === 0 ? (
          <Stack>
            <HelpCollapse
              title="Why Should I Fill Out My Profile in Detail?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Completing your profile in detail is crucial for several reasons. First, it aids us in the manual screening process, ensuring that you are matched with roommates who have similar educational backgrounds, work experiences, and interests. Second, it helps us identify the type of house — whether it's an E-commerce House, Fitness House, or any other focus — that would best suit your needs and aspirations.`,
                `Your profile data also inform us about the highest demand locations and rent budget ranges, which allows us to negotiate more effectively with real estate agencies. The more complete your profile is, the easier it is for us to create house projects that align with what you and other users are looking for.`,
                `In summary, a fully filled-out profile enables us to make more accurate matches, better negotiate housing options, and ultimately provide you with a living experience that can significantly benefit your personal and professional growth.`,
              ]}
            />
            <HelpCollapse
              title="What Are Tokens and How Do I Use Them?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Tokens serve as the in-app currency, which you'll need for applying to different types of housing projects within Brotherhood House. Upon successful registration, you're granted an initial set of tokens. Additionally, you'll receive a fresh set of tokens every 1st of the month.`,
                `If you run out of tokens or want to increase your chances of securing your desired housing, you can purchase additional tokens through Stripe. The pricing structure is designed to give you a better deal with larger purchases. For instance, buying tokens in bulk offers you a progressively increasing discount—up to 70% off compared to purchasing them individually.`,
                `Different types of applications, like Elite, Premium, Priority, and Basic, will cost varying amounts of tokens. For example, an Elite Application will consume more tokens but will be read first, giving you a better chance of selection. The application types are read in a specific order to streamline the selection process, with Stripe ensuring all your transactions are secure.`,
              ]}
            />
            <HelpCollapse
              title="What Types of Applications Are Available?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `We offer four different types of applications for housing projects: Elite, Premium, Priority, and Basic. Each type comes with its own benefits and costs a varying number of tokens.`,
                `Elite Application: Your application will be at the top of the list and is reviewed first. This gives you a higher chance of securing one of the first 2 spots in a housing project.`,
                `Premium Application: These are mixed in with Elite applications and are reviewed for the next set of 2 spots, making your odds better than basic and priority applicants but not as high as Elite.`,
                `Priority Application: Priority, along with Elite and Premium applications, are all reviewed together for another set of 2 spots. This increases your chances compared to Basic but is less advantageous than Elite or Premium applications.`,
                `Basic Application: These applications are mixed in with all other types and are reviewed for the last 2 spots in the housing project.`,
                `The type of application you choose will impact your chances of being selected, so choose wisely based on how eager you are to join a specific housing project. (Please note that for houses with fewer or more than 8 spots, the distribution of application reviews may vary. Choose your application type based on your eagerness to secure a spot in a specific housing project.)`,
              ]}
            />
            <HelpCollapse
              title="How Does the House Selection Process Work?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Once a house project is created based on user demand and preferences, members have the opportunity to apply to it. The application process involves different tiers: Elite, Premium, Priority, and Basic. Each tier has its own set of perks, like being read first, which increases your chances of being selected.`,
                `We manually review all applications to ensure a good fit among potential housemates. The applications are prioritized based on their tier, with Elite applications reviewed first for two places in the house, followed by a mix of Premium and Elite applications for another two places, and so on.`,
                `After the first round of review, the status of the most suitable candidates is changed to 'Selected,' signaling their advancement to the next round. This could involve additional screenings or interviews to confirm the fit.`,
                `Finally, if everything aligns well in the second round, the selected members will be asked to sign a contract with the real estate agency. Once the contracts are signed, members can move into their new, curated living environment, optimized for personal and professional growth.`,
              ]}
            />
            <HelpCollapse
              title="How Are Housemates Chosen?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Choosing the right housemates is a carefully conducted manual process designed to create a living environment that fosters growth, collaboration, and community. We look beyond traditional metrics like formal education; we value hard work, dedication, and a broad spectrum of talents and skills.`,
                `If you've applied multiple times, that's not a mark against you; on the contrary, it shows your dedication and eagerness to become part of this community. Whether you're a career veteran with a Ph.D. or someone who has gained their skills through practical experiences and self-study, there's a place for you here.`,
                `Our aim is to identify candidates who can contribute meaningfully to the house environment in their own unique way, be it through their work ethic, skills, or personality. The goal is to create a diverse but cohesive group where everyone feels they can both contribute and learn.`,
                `So, regardless of your background, if you are committed to growth, have a proven track record in your field (whatever that may be), and demonstrate a willingness to collaborate and contribute, you could very well find your next home at Brotherhood House.`,
              ]}
            />
          </Stack>
        ) : (
          <HelpPageContact>
            <HelpPageContactContainer>
              <Stack>
                <h2>Write to us</h2>
                <Input
                  type="select"
                  label="Topic"
                  placeholder="Select Topic"
                  value={helpFormData.topic}
                  onValue={(value) =>
                    setHelpFormData({ ...helpFormData, topic: value })
                  }
                  options={topicOptions}
                />
                <Input
                  type="text"
                  label="Subject"
                  placeholder="Please Enter"
                  value={helpFormData.subject}
                  onValue={(subject) =>
                    setHelpFormData({ ...helpFormData, subject })
                  }
                />
                <Input
                  type="text"
                  label="Message"
                  placeholder="Please Enter"
                  value={helpFormData.message}
                  onValue={(message) =>
                    setHelpFormData({ ...helpFormData, message })
                  }
                  multiline
                />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={sendSupportEmail}
                  disabled={isDisabled}
                >
                  Send
                </Button>
              </Stack>
            </HelpPageContactContainer>
            <HelpPageContactContainer>
              <HelpPageIconWithTextContainer>
                <h2>Get in touch</h2>
                <Stack>
                  <IconWithText
                    icon={<PhoneCallIcon />}
                    link="https://calendly.com/jurisicholdings/30min"
                    title="Talk with our founder"
                    text={['Schedule a call!']}
                  />
                  <IconWithText
                    icon={<EnvelopeIcon />}
                    link="mailto:info@brotherhoodhouse.com"
                    title="Write to our founder"
                    text={['Send an email!']}
                  />
                  <IconWithText
                    icon={<LocationIcon />}
                    title="Visit Us"
                    text={['Riehenring 65, 4058 Basel Switzerland']}
                    link="https://maps.app.goo.gl/FFRg7j3XiTrcAo4F6"
                  />
                </Stack>
              </HelpPageIconWithTextContainer>
            </HelpPageContactContainer>
          </HelpPageContact>
        )}
      </Stack>
    </HelpPageMain>
  );
};

export default HelpPage;
