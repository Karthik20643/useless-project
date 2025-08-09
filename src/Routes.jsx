import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InteractiveFloorPlanMap from './pages/interactive-floor-plan-map';
import TeacherSelectionInterface from './pages/teacher-selection-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<InteractiveFloorPlanMap />} />
        <Route path="/interactive-floor-plan-map" element={<InteractiveFloorPlanMap />} />
        <Route path="/teacher-selection-interface" element={<TeacherSelectionInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
