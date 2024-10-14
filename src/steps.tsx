import { lazy } from "react";

export const getComponent = (step: number | string) => lazy(() => import(`./components/Step${step}`));

export const STEPS_COUNT = 9;