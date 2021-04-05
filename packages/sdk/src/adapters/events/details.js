/**
 * Core Packages
 */
import display from '../../display';
import {
    date,
    sortByProperty,
    getEventStatus,
    getEventSessionStatus,
    textStripHTML,
} from '../../utils';

/**
 * Event Adapter
 *
 * @param {object} event
 * @param {object} user
 *
 * @returns {object}
 */
export function details(
    eventResponse = {},
    user = {}
) {
    if (!eventResponse ||
        (typeof eventResponse !== 'object')) {
        return null;
    }

    /**
     * User values
     */
    const {
        id   : userId,
        roles: userRoles,
    } = (user || {});
    const {
        userAdmin,
        userPro,
        userSalesGroupMember,
        userSalesGroupManager,
    } = (userRoles || {});

    /**
     * Event values
     */
    const { data: eventData } = eventResponse;
    const {
        staff          : eventStaff,
        producerId     : eventOwnerId,
        usersPermission: eventUsersPermission,
        crewIds        : eventCrew,
        status         : eventStatus,
        poster         : eventPoster,
        sessions       : eventSessions,
        date           : eventDates,
        description    : eventDescription,
        updatedAt      : eventUpdatedAt,
    } = (eventData || eventResponse || {});

    /**
     * Helpers
     */
    const qTimestamp = `?timestamp=${eventUpdatedAt}`;

    /**
     * Status
     */
    const status = getEventStatus(eventStatus);

    /**
     * Descrition
     */
    const descriptionClean = textStripHTML(eventDescription || '');

    /**
     * Poster
     */
    const {
        small,
        medium,
        large,
        xLarge,
    } = (eventPoster || {});
    const poster = {
        small : `${small || eventPoster || ''}${qTimestamp}`,
        medium: `${medium || eventPoster || ''}${qTimestamp}`,
        large : `${large || eventPoster || ''}${qTimestamp}`,
        xLarge: `${xLarge || eventPoster || ''}${qTimestamp}`,
    };

    /**
     * Sessions
     */
    let sessions = [];
    let future   = [];
    let past     = [];

    (eventSessions || eventDates || []).map((session) => {
        const {
            dateTime: sessionDateTime,
            status  : sessionStatus,
            ...rest
        } = (session || {});
        const {
            date: dtDate,
            time: dtTime,
        } = (sessionDateTime || {});

        const datetime    = ((dtDate && dtTime) ? date.utc((dtDate + ' ' + dtTime), 'DD/MM/YYYY HH:mm:ss').format() : sessionDateTime);
        const datetimeRef = date.utc(datetime);
        const sessionRef  = {
            ...rest,
            datetime,
            datetimeRef,
            past    : datetimeRef.isBefore(date()),
            future  : datetimeRef.isAfter(date()),
            simple  : datetimeRef.format(display('dateTime')),
            extended: datetimeRef.format(display('dateTimeExtended')),
            status  : getEventSessionStatus(sessionStatus),
        };

        sessions.push(sessionRef);

        if (sessionRef.past) {
            past.push(sessionRef);

        } else {
            future.push(sessionRef);
        }

        return true;
    });

    sessions = sortByProperty(sessions, 'datetime');
    future   = sortByProperty(future, 'datetime');
    past     = sortByProperty(past, 'datetime');

    /**
     * Sessions Summary
     */
    const sessionsLeft    = (sessions.length - 1);
    const sessionsSummary = (!sessions.length ? 'Nenhuma sessão' : (
        sessions[0].simple + (
            !sessionsLeft ? '' : (
                ' +' +
                sessionsLeft + (
                    (sessionsLeft > 1) ? ' sessões' : ' sessão'
                )
            )
        )
    ));

    /**
     * Roles
     */
    let roles = {
        eventStaff           : false,
        eventOwner           : false,
        eventAdmin           : false,
        eventSeller          : false,
        eventSponsor         : false,
        eventOperator        : false,
        eventSalesManager    : false,
        eventSalesOperator   : false,
        eventFreepass        : false,
        eventEntranceManager : false,
        eventEntranceOperator: false,
    };

    const {
        admin            : staffAdmin,
        entrance_manager : staffEntranceManager,
        entrance_operator: staffEntranceOperator,
        sales_manager    : staffSalesManager,
        sales_operator   : staffSalesOperator,
    } = (eventStaff || {});

    roles.eventOwner = !!((userAdmin || (eventOwnerId === userId)));
    roles.eventAdmin = !!(
        roles.eventOwner ||
        (staffAdmin && staffAdmin.includes(userId))
    );
    roles.eventEntranceManager = !!(
        roles.eventAdmin ||
        (staffEntranceManager && staffEntranceManager.includes(userId))
    );
    roles.eventEntranceOperator = !!(
        roles.eventAdmin || roles.eventEntranceManager ||
        (staffEntranceOperator && staffEntranceOperator.includes(userId))
    );
    roles.eventSeller = !!(
        roles.eventAdmin ||
        (eventCrew && eventCrew.includes(userId)) ||
        (eventUsersPermission && eventUsersPermission.includes(userId))
    );
    roles.eventSalesManager = !!(
        roles.eventAdmin ||
        (staffSalesManager && staffSalesManager.includes(userId)) ||
        (roles.eventSeller && userSalesGroupManager)
    );
    roles.eventSalesOperator = !!(
        roles.eventAdmin ||
        (staffSalesOperator && staffSalesOperator.includes(userId))
    );
    roles.eventSponsor = !!(
        roles.eventAdmin ||
        (roles.eventSeller && userSalesGroupMember)
    );
    roles.eventFreepass = !!(
        (roles.eventAdmin && userPro) ||
        (roles.eventSponsor && userPro)
    );
    roles.eventStaff = !!(
        roles.eventOwner ||
        roles.eventAdmin ||
        roles.eventSeller ||
        roles.eventSalesManager ||
        roles.eventEntranceManager ||
        roles.eventSponsor ||
        roles.eventFreepass
    );

    /**
     * Actions
     */
    const canDuplicate = !!(roles.eventAdmin && (sessions.length === 1));
    const canVisit     = ([ 'public', 'private' ].includes(status.original));

    return {
        ...(eventData || eventResponse || {}),
        status,
        roles,
        poster,
        sessions      : sessions,
        sessionsPast  : past,
        sessionsFuture: future,
        sessionsSummary,
        sessionsLeft,
        canDuplicate,
        canVisit,
        descriptionClean,
    };
}
