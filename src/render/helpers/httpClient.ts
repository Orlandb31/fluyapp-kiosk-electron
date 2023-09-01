import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> { }
}


export abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public baseUrl = {
        msUsers: 'https://fluyapp.com/api/ms_users',
        msEntities: 'https://fluyapp.com/api_entities',
        msMoving: 'https://fluyapp.com/api_moving',
        msDevices: 'https://fluyapp.com/devices',
        msVideo: 'https://fluyapp.com/video',
        msAnalytics: 'https://fluyapp.com/api_analytics',
        msNotifications: 'https://fluyapp.com/api_notifications',
        msSocket: 'https://fluyapp.com/socket',
        msProvider: 'https://api.v3.metrored.med.ec'
    };

    public constructor(config: any) {
        this.instance = axios.create({

        });

        if (config?.Authorization)
            this.instance.defaults.headers.common['Authorization'] = config?.Authorization

        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }
    private _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this._handleRequest as any,
            this._handleError,
        );

    };

    private _handleRequest = async (config: AxiosRequestConfig) => {
        //const token = await AsyncStorage.getItem('userToken')
        if (config.headers) {
            //  config.headers['Authorization'] = `bearer ${token}`;
        }
        return config;
    };


    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );

    };

    private _handleResponse = ({ data }: AxiosResponse) => { return data };

    protected _handleError = async (error: any) => {



        if (error?.response?.status == 403 || error?.response?.status == 401) {
            //await AsyncStorage.removeItem('fcmToken')
            //await AsyncStorage.removeItem('userToken')
            //const { dispatch } = store;
            //dispatch({ type: AuthActions.Type.LOGOUT })
        }

        console.log(error)

        return Promise.reject(error?.response?.data);

    }
}
