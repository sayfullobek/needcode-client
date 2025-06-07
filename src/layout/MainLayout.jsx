import { Outlet } from 'react-router-dom'
import Footer from '../component/main/Footer'
import Navbar from '../component/main/Navbar'

export default function MainLayout() {
	return (
		<div>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	)
}
