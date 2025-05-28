export const NEED_CODE = 'auth/dashboard'
export const NEED_CODE_STUDENT = 'dashboard'

export const DASHBOARD_URL = {
	dashboardStudent: `${NEED_CODE_STUDENT}`,
	projectStudent: `${NEED_CODE_STUDENT}/project`,
	courseStudent: `${NEED_CODE_STUDENT}/course`,
	sourceCodeStudent: `${NEED_CODE_STUDENT}/source-code`,

	dashboard: `${NEED_CODE}`,
	course: `${NEED_CODE}/course`,
	goCourse: `${NEED_CODE}/course/go`,
	courseAdd: `${NEED_CODE}/course/add`,
	courseUpdate: `${NEED_CODE}/course/update`,

	module: `${NEED_CODE}/module`,
	moduleAdd: `${NEED_CODE}/course/go/module/add`,
	moduleUpdate: `${NEED_CODE}/course/go/module/update`,
	goModule: `${NEED_CODE}/course/go/module/go`,
	lessonAdd: `${NEED_CODE}/course/go/module/go/add`,
	lessonUpdate: `${NEED_CODE}/course/go/module/go/update`,

	learn: `${NEED_CODE}/learn`,
	learnAdd: `${NEED_CODE}/learn/add`,
	learnUpdate: `${NEED_CODE}/learn/update`,

	whoFor: `${NEED_CODE}/who-for`,
	whoForAdd: `${NEED_CODE}/who-for/add`,
	whoForUpdate: `${NEED_CODE}/who-for/update`,

	sourceCode: `${NEED_CODE}/source-code`,
	sourceCodeAdd: `${NEED_CODE}/source-code/add`,
	sourceCodeUpdate: `${NEED_CODE}/source-code/update`,

	employee: `${NEED_CODE}/employee`,
	employeeAdd: `${NEED_CODE}/employee/add`,
	employeeUpdate: `${NEED_CODE}/employee/update`,

	students: `${NEED_CODE}/students`,

	login: 'auth/login',
	register: 'auth/register',
}
