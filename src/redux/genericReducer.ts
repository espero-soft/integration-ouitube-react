// genericReducer.ts

// Actions
export const SET_DATA = 'SET_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Actions Creators
export const setData = (data: any) => ({ type: SET_DATA, data });
export const setLoading = (loading: boolean) => ({ type: SET_LOADING, loading });
export const setError = (error: string | null) => ({ type: SET_ERROR, error });

// État initial générique
export interface GenericState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

const initialState: GenericState<any> = {
  data: null,
  loading: false,
  error: null,
};

// Reducer générique
export const createGenericReducer = <T>(initialState: GenericState<T>) =>
  (state = initialState, action: any): GenericState<T> => {
      
    switch (action.type) {
      case SET_DATA:
        return { ...state, data: action.data };
      case SET_LOADING:
        return { ...state, loading: action.loading };
      case SET_ERROR:
        return { ...state, error: action.error };
      default:
        return state;
    }
  };

export default createGenericReducer(initialState);
