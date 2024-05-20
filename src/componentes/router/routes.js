import Login from "../views/main/Login";
import Register from "../views/main/Register";
import Home from "../views/home/Home";
import SubjectsView from "../views/subjects/SubjectsView";
import SubjectDetailView from "../views/subjects/subject_detail_view/SubjectDetailView";

export const routes = [
    {
        path: '/login',
        Component: Login,
        name: 'Login'
    },
    {
        path: '/register',
        Component: Register,
        name: 'Register'
    },
    {
        path: '/home/index',
        Component: Home,
        name: 'Home'
    },
    {
        path: '/home/subjects/:anio',
        Component: SubjectsView,
        name: 'SubjectsView'
    },
    {
        path: '/home/subjects/:anio/:name',
        Component: SubjectDetailView,
        name: 'SubjectDetailView'
    }
]

