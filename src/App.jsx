import { Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'
import OfferDetailsPage from './pages/OfferDetailsPage'
import DevelopersPage from './pages/DevelopersPage'
import DeveloperProfilePage from './pages/DeveloperProfilePage'
import OrganizationProfilePage from './pages/OrganisationProfilePage'
import ProfilPublicOrganisationPage from './pages/OrganisationPubliqueP'
import ApplicationsPage from './pages/ApplicationsPage'
import AdminLoginPage from './pages/AdminLoginPage'
import { ForgotPasswordPage, LoginPage, RegisterPage } from './pages/AuthPages'
import OrganizationApplicationsPage from './pages/OrganizationApplicationsPage'


import MyProfilePage from './pages/MyProfilePage'
import OrganizationProfile from './pages/OrganizationProfile'

function NotFound() {
  return (
    <div className="container page-shell empty-state">
      <h2>Page introuvable</h2>
      <a href="/">Retour à l'accueil</a>
    </div>
  )
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
        <Route path="/organization/profile" element={<OrganizationProfilePage/>}/>
        <Route path="/organizations/:id" element={<ProfilPublicOrganisationPage/>}/>
        <Route path="/applications/received" element={<ApplicationsPage/>}/>
        <Route path="/organization/applications" element={<OrganizationApplicationsPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/admin/login" element={<AdminLoginPage/>}/>

        {/* Mes pages (US-06 / US-07 / US-15) */}
        <Route path="/profile" element={<MyProfilePage/>}/>
        <Route path="/organization/my-profile" element={<OrganizationProfile/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  )
}