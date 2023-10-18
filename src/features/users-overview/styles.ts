import styled from '@emotion/styled';

export const ApplicationContainer = styled.div`
  width: 100%;
`;

export const AccountHeadline = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #2d3779;
  display: flex;
`;

export const PreferenceHeadline = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #2d3779;
  display: flex;
`;

export const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 10%;
  padding-right: 90px;
  @media screen and (max-width: 900px) {
    padding-right: 20px;
    gap: 10px 50px;
    .css-1ny51ew-StackMain {
      position: static !important;
      width: 100% !important;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      
    }
  }
  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
    gap: 25px 50px;
    padding-right: 10px;
  }
`;

export const PreferenceEditButton = styled.div`
  cursor: pointer;
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    padding-left: 10px;
  }
`;

export const SkillGrid = styled.div`
  padding-right: 90px;
`;
