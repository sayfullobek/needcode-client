import { DASHBOARD_URL } from './Utils'

export const LEARN_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Texnologiyalar',
		primary: true,
	},
]

export const LEARN_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Texnologiyalar',
		url: `/${DASHBOARD_URL.learn}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const WHO_FOR_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kimlar uchun',
		primary: true,
	},
]

export const WHO_FOR_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kimlar uchun',
		url: `/${DASHBOARD_URL.whoFor}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const SOURCE_CODE_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kod manbalari',
		primary: true,
	},
]

export const SOURCE_CODE_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kod manbalari',
		url: `/${DASHBOARD_URL.sourceCode}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const COURSE_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kurslar',
		primary: true,
	},
]

export const COURSE_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kurslar',
		url: `/${DASHBOARD_URL.course}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const EMPLOYEE_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Hodimlar',
		primary: true,
	},
]

export const EMPLOYEE_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Hodimlar',
		url: `/${DASHBOARD_URL.employee}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const MODULE_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Modul',
		primary: true,
	},
]

export const MODULE_BREADCRUMP_ADD = id => {
	return [
		{
			name: 'Asosiy sahifa',
			url: `/${DASHBOARD_URL.dashboard}`,
			primary: false,
		},
		{
			name: 'Modul',
			url: `/${DASHBOARD_URL.goCourse}`,
			primary: false,
		},
		{
			name: 'Saqlash',
			primary: true,
		},
	]
}

export const LESSON_BREADCRUMP = (courseId, courseName, moduleName) => {
	return [
		{
			name: 'Asosiy sahifa',
			url: `/${DASHBOARD_URL.dashboard}`,
			primary: false,
		},
		{
			name: 'Kurslar',
			url: `/${DASHBOARD_URL.course}`,
			primary: false,
		},
		{
			name: courseName,
			url: `/${DASHBOARD_URL.goCourse}/${courseId}`,
			primary: false,
		},
		{
			name: `${moduleName} - Darslik`,
			primary: true,
		},
	]
}

export const LESSON_BREADCRUMP_ADD = (
	courseId,
	courseName,
	moduleName,
	moduleId
) => {
	return [
		{
			name: 'Asosiy sahifa',
			url: `/${DASHBOARD_URL.dashboard}`,
			primary: false,
		},
		{
			name: 'Kurslar',
			url: `/${DASHBOARD_URL.course}`,
			primary: false,
		},
		{
			name: courseName,
			url: `/${DASHBOARD_URL.course}/${courseId}`,
			primary: false,
		},
		{
			name: moduleName,
			url: `/${DASHBOARD_URL.course}/${courseId}/${moduleId}`,
			primary: false,
		},
		{
			name: 'Kurs saqlash',
			primary: true,
		},
	]
}

export const STUDENT_COURSE_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboardStudent}`,
		primary: false,
	},
	{
		name: 'Kurslar',
		primary: true,
	},
]

export const STUDENT_PROJECT_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboardStudent}`,
		primary: false,
	},
	{
		name: 'Loyihalar',
		primary: true,
	},
]

export const STUDENT_SOURCE_CODE_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboardStudent}`,
		primary: false,
	},
	{
		name: 'Kod manbalari',
		primary: true,
	},
]
