import getPlatform from '../getPlatform';
import * as Environment from '../Environment/Environment';
import Firebase from '../Firebase';
import * as API from '../API';
import Log from '../Log';

let timestampData = {};

/**
 * Start a performance timing measurement
 *
 * @param {String} eventName
 * @param {Boolean} shouldUseFirebase - adds an additional trace in Firebase
 */
function start(eventName, shouldUseFirebase = false) {
    timestampData[eventName] = {startTime: Date.now(), shouldUseFirebase};

    if (!shouldUseFirebase) {
        return;
    }

    Firebase.startTrace(eventName);
}

/**
 * End performance timing. Measure the time between event start/end in milliseconds, and push to Grafana
 *
 * @param {String} eventName - event name used as timestamp key
 * @param {String} [secondaryName] - optional secondary event name, passed to grafana
 * @param {number} [maxExecutionTime] - optional amount of time (ms) to wait before logging a warn
 */
function end(eventName, secondaryName = '', maxExecutionTime = 0) {
    if (!timestampData[eventName]) {
        return;
    }

    Environment.getEnvironment().then((envName) => {
        const {startTime, shouldUseFirebase} = timestampData[eventName];
        const eventTime = Date.now() - startTime;

        if (shouldUseFirebase) {
            Firebase.stopTrace(eventName);
        }

        const baseEventName = `${envName}.new.expensify.${eventName}`;
        const grafanaEventName = secondaryName ? `${baseEventName}.${secondaryName}` : baseEventName;

        console.debug(`Timing:${grafanaEventName}`, eventTime);
        delete timestampData[eventName];

        if (Environment.isDevelopment()) {
            // Don't create traces on dev as this will mess up the accuracy of data in release builds of the app
            return;
        }

        if (maxExecutionTime && eventTime > maxExecutionTime) {
            Log.warn(`${eventName} exceeded max execution time of ${maxExecutionTime}.`, {eventTime, eventName});
        }

        API.read(
            'SendPerformanceTiming',
            {
                name: grafanaEventName,
                value: eventTime,
                platform: `${getPlatform()}`,
            },
            {},
        );
    });
}

/**
 * Clears all timing data
 */
function clearData() {
    timestampData = {};
}

export default {
    start,
    end,
    clearData,
};
