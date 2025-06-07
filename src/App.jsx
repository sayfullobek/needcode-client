import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Course from './component/main/Course'
import { DashboardLayouts } from './layout/DashboardLayout'
import MainLayout from './layout/MainLayout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Courses } from './pages/dashboard/course/Courses'
import { CoursesAddAndUpdate } from './pages/dashboard/course/CoursesAddAndUpdate'
import { GoCourse } from './pages/dashboard/course/GoCourse'
import { GoModule } from './pages/dashboard/course/GoModule'
import { LessonAddAndUpdate } from './pages/dashboard/course/LessonAddAndUpdate'
import { ModuleAddAndUpdate } from './pages/dashboard/course/ModuleAddAndUpdate'
import Dashboard from './pages/dashboard/Dashboard'
import { Employee } from './pages/dashboard/employees/Employee'
import { EmployeeAddAndUpdate } from './pages/dashboard/employees/EmployeeAddAndUpdate'
import { Learn } from './pages/dashboard/learn/Learn'
import { LearnAddAndUpdate } from './pages/dashboard/learn/LearnAddAndUpdate'
import { SourceCode } from './pages/dashboard/sourceCode/SourceCode'
import { SourceCodeAddAndUpdate } from './pages/dashboard/sourceCode/SourceCodeAddAndUpdate'
import { StudentAll } from './pages/dashboard/student/StudentAll'
import { WhoFor } from './pages/dashboard/whoFor/WhoFor'
import { WhoForAddAndUpdate } from './pages/dashboard/whoFor/WhoForAddAndUpdate'
import { Menu } from './pages/Menu'
import { CourseStudent } from './pages/student/CourseStudent'
import { DashboardStudent } from './pages/student/DashboardStudent'
import { GoLessons } from './pages/student/GoLessons'
import { OneCourse } from './pages/student/OneCourse'
import { SourceCodeStudent } from './pages/student/SourceCodeStudent'
import { DASHBOARD_URL } from './utils/Utils'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<Menu />} />
					<Route path={`/${DASHBOARD_URL.mainCourse}`} element={<Course />} />
				</Route>
				<Route path={`/${DASHBOARD_URL.login}`} element={<Login />} />
				<Route path={`/${DASHBOARD_URL.register}`} element={<Register />} />
				<Route
					path={`/${DASHBOARD_URL.dashboardStudent}/:status/go-lessons/:id/:moduleId/:lessonId`}
					element={<GoLessons />}
				/>
				<Route
					path={`/${DASHBOARD_URL.dashboardStudent}`}
					element={<DashboardLayouts />}
				>
					<Route index element={<DashboardStudent />} />
					<Route
						path={`/${DASHBOARD_URL.courseStudent}`}
						element={<CourseStudent status={'course'} />}
					/>
					<Route
						path={`/${DASHBOARD_URL.projectStudent}`}
						element={<CourseStudent status={'project'} />}
					/>
					<Route
						path={`/${DASHBOARD_URL.courseStudent}/:id`}
						element={<OneCourse status={'course'} />}
					/>
					<Route
						path={`/${DASHBOARD_URL.projectStudent}/:id`}
						element={<OneCourse status={'project'} />}
					/>

					<Route
						path={`/${DASHBOARD_URL.sourceCodeStudent}`}
						element={<SourceCodeStudent />}
					/>

					<Route
						path={`/${DASHBOARD_URL.studentStartCourse}`}
						element={<CourseStudent status={'start'} />}
					/>
				</Route>
				<Route
					path={`/${DASHBOARD_URL.dashboard}`}
					element={<DashboardLayouts />}
				>
					<Route path={`/${DASHBOARD_URL.dashboard}`} element={<Dashboard />} />
					<Route path={`/${DASHBOARD_URL.course}`} element={<Courses />} />
					<Route
						path={`/${DASHBOARD_URL.goCourse}/:id`}
						element={<GoCourse />}
					/>
					<Route
						path={`/${DASHBOARD_URL.courseAdd}`}
						element={<CoursesAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.courseUpdate}/:id`}
						element={<CoursesAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.moduleAdd}/:courseId`}
						element={<ModuleAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.moduleUpdate}/:courseId/:id`}
						element={<ModuleAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.goModule}/:courseId/:moduleId`}
						element={<GoModule />}
					/>
					<Route
						path={`/${DASHBOARD_URL.lessonAdd}/:courseId/:moduleId`}
						element={<LessonAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.lessonUpdate}/:courseId/:moduleId`}
						element={<LessonAddAndUpdate />}
					/>

					<Route path={`/${DASHBOARD_URL.learn}`} element={<Learn />} />
					<Route
						path={`/${DASHBOARD_URL.learnAdd}`}
						element={<LearnAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.learnUpdate}/:id`}
						element={<LearnAddAndUpdate />}
					/>

					<Route path={`/${DASHBOARD_URL.whoFor}`} element={<WhoFor />} />
					<Route
						path={`/${DASHBOARD_URL.whoForAdd}`}
						element={<WhoForAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.whoForUpdate}/:id`}
						element={<WhoForAddAndUpdate />}
					/>

					<Route
						path={`/${DASHBOARD_URL.sourceCode}`}
						element={<SourceCode />}
					/>
					<Route
						path={`/${DASHBOARD_URL.sourceCodeAdd}`}
						element={<SourceCodeAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.sourceCodeUpdate}/:id`}
						element={<SourceCodeAddAndUpdate />}
					/>

					<Route path={`/${DASHBOARD_URL.employee}`} element={<Employee />} />
					<Route
						path={`/${DASHBOARD_URL.employeeAdd}`}
						element={<EmployeeAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.employeeUpdate}/:id`}
						element={<EmployeeAddAndUpdate />}
					/>
					<Route path={`/${DASHBOARD_URL.students}`} element={<StudentAll />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
