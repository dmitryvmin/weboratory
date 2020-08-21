import { TagMapService } from "@api/services/TagMapService/TagMapService";

const tagMapServiceSingleton = new TagMapService();
Object.freeze(tagMapServiceSingleton);

export {tagMapServiceSingleton}
