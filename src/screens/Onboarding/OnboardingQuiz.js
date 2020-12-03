// @flow
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { TrackScreen } from "../../analytics";
import { ScreenName } from "../../const";
import colors from "../../colors";
import LText from "../../components/LText";
import ConfirmationModal from "../../components/ConfirmationModal";
import AnimatedHeaderView from "../../components/AnimatedHeader";
import newDeviceBg from "./assets/newDevice.png";
import onboardingQuizzCorrectAnswer from "./assets/onboardingQuizzCorrectAnswer.png";
import onboardingQuizzWrongAnswer from "./assets/onboardingQuizzWrongAnswer.png";

import quizScenes from "./shared/quizData";

const InfoView = ({
  label,
  title,
  image,
  answers,
  onPress,
}: {
  label: React$Node,
  title: React$Node,
  image: number,
  answers: {
    title: React$Node,
    correct: boolean,
  }[],
  onPress: boolean => void,
}) => (
  <View style={[styles.root]}>
    <LText style={[styles.label, { color: colors.live }]} bold>
      {label}
    </LText>
    <LText bold style={styles.title}>
      {title}
    </LText>
    <View style={[styles.answerContainer]}>
      {answers.map(({ title, correct }, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.answer, { backgroundColor: colors.white }]}
          onPress={() => onPress(correct)}
        >
          <LText semiBold style={[styles.answerText, { color: colors.live }]}>
            {title}
          </LText>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={image} resizeMode="cover" />
    </View>
  </View>
);

const routeKeys = quizScenes.map((k, i) => ({ key: `${i}` }));

const initialLayout = { width: Dimensions.get("window").width };

function OnboardingQuizz({ navigation, route }: *) {
  const [index, setIndex] = useState(0);
  const [routes] = useState(routeKeys);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userAnswers, setAnswers] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const onClickAnswer = useCallback(correct => {
    setAnswers(a => (correct ? a + 1 : a));
    setCurrentAnswer(correct);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const skip = useCallback(() => {
    navigation.navigate(ScreenName.OnboardingPairNew, {
      ...route.params,
      next: ScreenName.OnboardingFinish,
    });
  }, [navigation, route.params]);

  const onModalHide = useCallback(() => {
    if (index + 1 === quizScenes.length) {
      navigation.navigate(ScreenName.OnboardingQuizFinal, {
        success: userAnswers >= 2,
      });
    } else {
      setIndex(i => Math.min(i + 1, quizScenes.length - 1));
    }
  }, [index, userAnswers, navigation]);

  const renderScene = SceneMap(
    quizScenes.reduce(
      (sum, k, i) => ({
        ...sum,
        [i]: () => (
          <InfoView
            label={k.label}
            title={k.title}
            image={newDeviceBg}
            answers={k.answers}
            onPress={onClickAnswer}
          />
        ),
      }),
      {},
    ),
  );

  const currentScene = quizScenes[index];
  return (
    <>
      <AnimatedHeaderView
        style={[styles.header, { backgroundColor: colors.lightLive }]}
        title={null}
        hasBackButton
        closeAction={skip}
        hasCloseButton
      />
      <View style={[styles.root, { backgroundColor: colors.lightLive }]}>
        <TrackScreen category="Onboarding" name="Quizz" />
        <TabView
          renderTabBar={() => null}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
        />
        <View style={styles.dotContainer}>
          {quizScenes.map((k, i) => (
            <Pressable
              key={i}
              style={[
                styles.dot,
                index >= i
                  ? { backgroundColor: colors.white }
                  : { backgroundColor: colors.translucentGrey },
              ]}
            >
              <View />
            </Pressable>
          ))}
        </View>
      </View>
      <ConfirmationModal
        isOpened={isModalOpen}
        hideRejectButton
        image={
          currentAnswer
            ? onboardingQuizzCorrectAnswer
            : onboardingQuizzWrongAnswer
        }
        confirmationTitle={
          currentScene.modal[currentAnswer ? "success" : "fail"]
        }
        confirmationDesc={currentScene.modal.text}
        confirmButtonText={currentScene.modal.cta}
        onConfirm={closeModal}
        onModalHide={onModalHide}
        preventBackdropClick
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: { flex: 0 },
  root: {
    flex: 1,
  },
  label: {
    paddingHorizontal: 24,
    textAlign: "center",
    fontSize: 10,
    textTransform: "uppercase",
  },
  title: {
    paddingHorizontal: 24,
    textAlign: "center",
    fontSize: 22,
    marginVertical: 4,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    position: "absolute",
    bottom: -20,
    height: "70%",
    width: "100%",
  },
  dotContainer: {
    position: "absolute",
    bottom: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dot: { width: 8, height: 8, margin: 4, borderRadius: 8 },
  answerContainer: {
    padding: 24,
    marginBottom: 24,
  },
  answer: {
    borderRadius: 4,
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  answerText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default OnboardingQuizz;
