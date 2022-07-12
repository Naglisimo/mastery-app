import Vue from 'vue'
import Vuex from 'vuex'
import EventService from './services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: { id: 1, name: 'Naglis'},
        categories: [
            'sustainability',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community'
        ],
        events: [],
        eventsTotal: 0,
        event: {},
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENTS(state, event) {
            state.events = event
        },
        GET_TOTAL_EVENTS(state, event) {
            state.eventsTotal = event
        },
        SET_EVENT(state, event) {
            state.event = event
        }
    },
    actions: {
        createEvent({commit}, event) {
            return EventService.postEvent(event).then(() => {
                commit('ADD_EVENT', event)
            })
        },
        fetchEvents({ commit }, { perPage, page }) {
            EventService.getEvents(perPage, page)
            .then((res) => {
              commit('SET_EVENTS', res.data)
              commit('GET_TOTAL_EVENTS', res.headers['x-total-count'])
            })
            .catch(error => {
              console.log('there was some error', error.response)
            })
        },
        fetchEvent({ commit, getters }, id ) {
            let event = getters.getEventById(id)

            if (event) {
                console.log(event)
                commit('SET_EVENT', event)
            } else {
                EventService.getEvent(id)
                .then(({ data }) => {
                    commit('SET_EVENT', data)
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    },
    getters: {
        getEventById: state => id => {
            return state.events.find(event => event.id === id)
        }
    }
})