export type ResultMangadex = {
  result?: "ok" | "error";
};

export type MangaResponseMangadex = ResultMangadex & {
  response?: string;
  data?: MangaMangadex[];
  limit?: number;
  offset?: number;
  total?: number;
};

export type MangaMangadex = {
  id?: string;
  type?: string;
  attributes?: {
    title?: { [key: string]: string };
    altTitles?: [{ [key: string]: string }];
    description?: { [key: string]: string };
    isLocked?: boolean;
    links?: { [key: string]: string };
    originalLanguage?: string;
    lastVolume?: string;
    lastChapter?: string;
    publicationDemographic?: "shounen" | "shoujo" | "josei" | "seinen";
    status?: "ongoing" | "completed" | "hiatus" | "cancelled";
    year?: number;
    contentRating?: "safe" | "suggestive" | "erotica" | "pornographic";
    chapterNumbersResetOnNewVolume?: boolean;
    latestUploadedChapter?: string;
    tags?: TagMangadex[];
    state?: "draft" | "submitted" | "published" | "rejected";
    version?: number;
    createdAt?: string;
    updatedAt?: string;
  };
  relationships?: RelationshipMangadex[];
};

export type TagMangadex = {
  id?: string;
  type?: "tag";
  attributes?: {
    name?: { [key: string]: string };
    description?: { [key: string]: string };
    group?: "content" | "format" | "genre" | "theme";
    version?: number;
  };
  relationships?: RelationshipMangadex[];
};

export type RelationshipMangadex = {
  id?: string;
  type?: string;
  related?:
    | "monochrome"
    | "main_story"
    | "adapted_from"
    | "based_on"
    | "prequel"
    | "side_story"
    | "doujinshi"
    | "same_franchise"
    | "shared_universe"
    | "sequel"
    | "spin_off"
    | "alternate_story"
    | "alternate_version"
    | "preserialization"
    | "colored"
    | "serialization";
  attributes?: {};
};

export type CoverResponseMangadex = ResultMangadex & {
  response?: string;
  data?: CoverMangadex;
};

export type CoverMangadex = {
  id?: string;
  type?: "cover_art";
  attributes?: {
    volume?: string;
    fileName?: string;
    description?: string;
    locale?: string;
    version?: number;
    createdAt?: string;
    updatedAt?: string;
  };
  relationships?: RelationshipMangadex[];
};

export type ChaptersResponseMangadex = ResultMangadex & {
  response?: string;
  data?: ChapterMangadex[];
  limit?: number;
  offset?: number;
  total?: number;
};

export type ChapterMangadex = {
  id?: string;
  type?: "chapter";
  attributes?: {
    title?: string;
    volume?: string;
    chapter?: string;
    pages?: number;
    translatedLanguage?: string;
    uploader?: string;
    externalUrl?: string;
    version?: number;
    createdAt?: string;
    updatedAt?: string;
    publishAt?: string;
    readableAt?: string;
  };
  relationships?: RelationshipMangadex[];
};

export type ImageResponseMangadex = {
  data?: string[];
};

export type AggregateResponseMangadex = ResultMangadex & {
  volumes?: AggregateMangadex;
};

export type AggregateMangadex = {
  [key: string]: {
    volume?: string;
    count?: number;
    chapters?: {
      [key: string]: {
        id?: string;
        count?: number;
        chapter?: string;
        others?: string[];
      };
    };
  };
};

export type AggregateChapterMangadex = {
  [key: string]: {
    id?: string;
    count?: number;
    chapter?: string;
    others?: string[];
  };
};
