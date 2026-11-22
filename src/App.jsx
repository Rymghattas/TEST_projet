import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'
import OfferDetailsPage from './pages/OfferDetailsPage'
import DevelopersPage from './pages/DevelopersPage'
import DeveloperProfilePage from './pages/DeveloperProfilePage'
import OrganizationProfilePage from './pages/OrganizationProfilePage'
import ApplicationsPage from './pages/ApplicationsPage'
import { ForgotPasswordPage, LoginPage, RegisterPage } from './pages/AuthPages'

function NotFound() {
  return <div className="container page-shell empty-state"><h2>Page introuvable</h2><a href="/">Retour à l'accueil</a></div>
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/offers" element={<OffersPage/>}/>
        <Route path="/offers/:id" element={<OfferDetailsPage/>}/>
        <Route path="/developers" element={<DevelopersPage/>}/>
        <Route path="/developers/:id" element={<DeveloperProfilePage/>}/>
        <Route path="/organizations/:id" element={<OrganizationProfilePage/>}/>
        <Route path="/applications/received" element={<ApplicationsPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  )
}
