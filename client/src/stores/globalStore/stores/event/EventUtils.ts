import { ActiveEvent } from "@stores/EventStore/types";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";
import { getNewEventKey } from "@components/Events/utils/getEventKey";

/**
 * Map Utility Class
 */
class EventUtils {

  /**
   * Creates an Event object
   */
  public static async createEventObject({
    coordinates: coordinatesArg,
    eventId: eventIdArg,
    address,
    ...rest
  }: ActiveEvent) {

    // If no coordinates have been passed,
    // query coordinates by address
    let coordinates;
    if (!coordinatesArg && address) {
      coordinates = await geocodeQuery(address);
    }
    else {
      coordinates = coordinatesArg;
    }

    // Generate a key if eventId doesn't exist
    const eventId = eventIdArg ?? getNewEventKey(address);

    // Create event object
    const eventObject: ActiveEvent = {
      eventId,
      coordinates,
      address,
      ...rest,
    };

    return eventObject;
  }

}

export { EventUtils };
