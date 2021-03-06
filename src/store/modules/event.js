
import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
    events: [],
    eventsTotal: 0,
    event: {},
    perPage: 2
}
export const mutations = {
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
}
export const actions = {
    createEvent({commit, dispatch}, event) {
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event)
            const notification = {
                type: 'success',
                message: 'Your event has been creted!'
              }
              dispatch('notification/add', notification, { root: true })
        }).catch(error => {
            const notification = {
                type: 'error',
                message: `There was a problem creating your event: ${error.message}`
              }
              dispatch('notification/add', notification, { root: true })
              throw error
        })
    },
    fetchEvents({ commit, dispatch, state }, {  page }) {
        return EventService.getEvents(state.perPage, page)
        .then((res) => {
          commit('SET_EVENTS', res.data)
          commit('GET_TOTAL_EVENTS', res.headers['x-total-count'])
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching events: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true})
        })
    },
    fetchEvent({ commit, getters }, id ) {
        let event = getters.getEventById(id)

        if (event) {
            commit('SET_EVENT', event)
            return event
        } else {
            return EventService.getEvent(id)
            .then(({ data }) => {
                commit('SET_EVENT', data)
                return data
            })
        }
    }
}
export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}
