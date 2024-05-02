import { useReducer } from "react";

export const MODIFY_STEP = "modify-step";

export const stepsReducer = (state, { type, payload }) => {
  if (type === MODIFY_STEP) {
    return {
      ...state,
      step: payload,
    };
  }
};

const useBreadcrumsSteps = (initialStep = 0) => {
  // TODO: add a default step
  const [state, dispatchSteps] = useReducer(stepsReducer, {
    step: initialStep < 0 ? 0 : initialStep,
  });
  const actionCreators = {
    changeStep: (stepIndex) => {
      dispatchSteps({
        type: MODIFY_STEP,
        payload: stepIndex,
      });
    },
  };
  const step = state.step;
  return { step, ...actionCreators };
};

export default useBreadcrumsSteps;
