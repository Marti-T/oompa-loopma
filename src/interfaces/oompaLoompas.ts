export interface Welcome {
    current: number;
    total:   number;
    results: Result[];
}

export interface Result {
    first_name: string;
    last_name:  string;
    favorite:   Favorite;
    gender:     Gender;
    image:      string;
    profession: string;
    email:      string;
    age:        number;
    country:    Country;
    height:     number;
    id:         number;
}

export interface Detail {
    first_name: string;
    last_name:  string;
    image:      string;
    profession: string;
    email:      string;
    age:        number;
    height:     number;
    id:         number;
    gender:     Gender;
    country:    Country;
    description: string;
    isLoading: boolean;
}

export enum Country {
    Loompalandia = "Loompalandia",
}

export interface Favorite {
    color:         Color;
    food:          Food;
    random_string: string;
    song:          string;
}

export enum Color {
    Blue = "blue",
    Red = "red",
}

export enum Food {
    Chocolat = "Chocolat",
    CocoaNuts = "cocoa nuts",
}

export enum Gender {
    F = "Women",
    M = "Men",
}