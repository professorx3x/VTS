import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef();

export async function navigate(routeName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
}

export async function replace(routeName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params));
    }
}

export async function resetAndNavigate(routeName: string) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset(
            {
                index: 0,
                routes: [{ name: routeName }],
            }
        ));
    }
}

export async function goBack() {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack());
    }
}

export async function push(routeName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName, params));
    }
}

export async function prepareNavigation() {
    navigationRef.isReady();
}

export function navigateByRole(role: string | null) {
    if (role === 'admin') {
        navigate('AdminDashboard');
    } else if (role === 'rider') {
        navigate('RiderDashboard');
    } else {
        navigate('UserDashboard');
    }
}