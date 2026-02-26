import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { Navigation, Footer } from './components/Navigation';
import HomePage from './pages/HomePage';
import FindCarePage from './pages/FindCarePage';
import InsuranceGuidePage from './pages/InsuranceGuidePage';
import AppointmentPrepPage from './pages/AppointmentPrepPage';
import MedicalBillGuidePage from './pages/MedicalBillGuidePage';
import FinancialAssistancePage from './pages/FinancialAssistancePage';
import ResourcesPage from './pages/ResourcesPage';
import NavigationToolsPage from './pages/NavigationToolsPage';
import { GuidedJourneyPage } from './pages/GuidedJourneyPage';
import AboutPage from './pages/AboutPage';
import ChallengesPage from './pages/ChallengesPage';
import RightsPage from './pages/RightsPage';

// Root layout with persistent nav + footer
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const findCareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/find-care',
  component: FindCarePage,
});

const insuranceGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/insurance-guide',
  component: InsuranceGuidePage,
});

const appointmentPrepRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/appointment-prep',
  component: AppointmentPrepPage,
});

const medicalBillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/medical-bills',
  component: MedicalBillGuidePage,
});

const financialAssistanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/financial-assistance',
  component: FinancialAssistancePage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources',
  component: ResourcesPage,
});

const navigationToolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/navigation-tools',
  component: NavigationToolsPage,
});

const guidedJourneyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journey/$journeyId',
  component: GuidedJourneyPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const challengesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/challenges',
  component: ChallengesPage,
});

const rightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/healthcare-rights',
  component: RightsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  findCareRoute,
  insuranceGuideRoute,
  appointmentPrepRoute,
  medicalBillsRoute,
  financialAssistanceRoute,
  resourcesRoute,
  navigationToolsRoute,
  guidedJourneyRoute,
  aboutRoute,
  challengesRoute,
  rightsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
