import Reactt, { useState, useEffect, children } from "react";
import { View, Keyboard, KeyboardAvoidingView } from "react-native";
import styled, { useTheme } from "styled-components/native";

export const KeyboardHeight = ({}) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  // const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardStatus(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardStatus(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return keyboardStatus ? (
    <KeyboardAvoidingView
      style={{ height: "38%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    ></KeyboardAvoidingView>
  ) : null;
};

// export const SectionWrapper = styled.View`
//   paddingbottom: ${(props) => props.theme.space[4]};
//   padding: ${(props) => props.theme.space[2]};
// `;

// Spacer.defaultProps = {
//   position = 'top',
//   size = 'small'
// }
