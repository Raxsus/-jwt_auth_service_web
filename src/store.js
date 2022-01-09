import { createStore } from 'vuex'
import api from "./api/api";

const {user} = api.getCurrentUserData();

const state = {
    isAuthorize: false,
    user: user || null,
    users: [],
    updateUsersListAccessDeny: false
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    updateUser (state, user) {
        state.user = user;
    },
    updateUsersList (state, users) {
        state.users = users;
    },
    updateUsersListAccessDeny (state, val) {
        state.updateUsersListAccessDeny = val;
    },
    updateResponseResult (state, result) {
        state.responseResult = result;
    }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
    authorize: async ({ commit, state }, payload) => {
        const {email, password} = payload;
        const result = await api.authorize(email, password);
        commit('updateResponseResult', result);

        const {user} = api.getCurrentUserData();

        commit('updateUser', user);
    },
    logout: ({commit}) => {
        api.logout();
        commit('updateUser', null);
        commit('updateUsersList', []);
    },
    getUsersList: async ({commit}) => {
        const result = await api.getUsers();
        commit('updateResponseResult', result);
        if(result.status == 200) {
            commit('updateUsersList', result.data)
            commit('updateUsersListAccessDeny', false)
        } else {
            commit('updateUsersList', [])
            commit('updateUsersListAccessDeny', true)
        }
    }
}

// getters are functions.
const getters = {
    isAuthorize: state => {
        return !!state.user;
    },
    userName: state => {
        return state.user && `${state.user.Firstname} ${state.user.Secondname}` || '';
    },
    userRole: state => {
        return state.user && `${state.user.Role}` || '';
    },
    userEmail: state => {
        return state.user && `${state.user.Email}` || '';
    },
    users: state => {
        return state.users || [];
    },
    updateUsersListAccessDeny: state => {
        return state.updateUsersListAccessDeny;
    }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default createStore({
    state,
    getters,
    actions,
    mutations
})