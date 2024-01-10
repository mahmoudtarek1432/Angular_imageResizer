export interface Image {
    path: string;
    sizes: ImageSizings[];
    dominantColorHex: string
}

export interface ImageSizings {
    height: number;
    width: number;
}