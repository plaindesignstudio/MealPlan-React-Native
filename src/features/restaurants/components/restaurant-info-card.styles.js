import Styled from "styled-components";
import { Card } from "react-native-paper";

export const Info = Styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

export const RestaurantCard = Styled(Card)`

marginBottom: ${(props) => props.theme.space[0]};
`;

export const RestaurantCardCover = Styled(Card.Cover)` 
shadowOpacity: 0.1;
height: 180px;
elevation: 0;
marginBottom: ${(props) => props.theme.space[0]};
`;
// export const Title = Styled.Text`
// color: ${(props) => props.theme.colors.text.primary};
// fontSize: ${(props) => props.theme.fontSizes.body};
// font-family:  ${(props) => props.theme.fonts.heading};
// `;

// export const Address = Styled.Text`
// color: ${(props) => props.theme.colors.text.primary};
// fontSize: ${(props) => props.theme.fontSizes.caption};
// font-family:  ${(props) => props.theme.fonts.body};
// `;

export const Rating = Styled.View`
flex-direction: row;
padding-top: ${(props) => props.theme.space[0]};
padding-bottom: ${(props) => props.theme.space[2]};
`;

export const FlexSpaceBetween = Styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: ${(props) => props.theme.space[0]};
padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Open = Styled.View`
margin-left: auto;
`;
