import { tagMapService } from "@api/services/tagMapService";

const tagMapServiceSingleton = new tagMapService();
Object.freeze(tagMapServiceSingleton);

export {tagMapServiceSingleton}
