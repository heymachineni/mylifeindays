export type YMLDay = Record<string, EventMetadata>;

export type EventMetadata = {
	name: string;
	desc?: string;
	birthday?: boolean;
};

export type RenderableEvent = {
	type: 'event';
	start: string;
	name: string;
	desc?: string;
};

export type RenderableMarker =
	| {
			type: 'marker';
			markerType: 'birthday';
			start: string;
			name: string;
	  }
	| {
			type: 'marker';
			markerType: 'today';
			start: string;
	  }
	| {
			type: 'marker';
			markerType: 'decade';
			start: string;
			name: string;
	  };

export type RenderableGap = {
	type: 'uneventful';
	start: string;
	duration: number;
};

export type RenderableDay = RenderableEvent | RenderableGap | RenderableMarker;
