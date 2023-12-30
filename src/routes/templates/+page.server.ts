import { templatesSchema } from '$lib/schemas.js';
import { getTags } from '$utils/getTags';
import { injectData } from '$utils/injectData';
import templates from './templates.json';

export const prerender = false;

export const load = async ({ url }) => {
	const data = injectData(templatesSchema.parse(templates));

	const selectedTags = url.searchParams.getAll('tag');

	if (!selectedTags) {
		return { packages: data, tags: getTags(data), selectedTags: [] };
	}

	const filteredData = data.filter((entry) => {
		return selectedTags.every((val) => entry.tags.includes(val));
	});

	return { templates: filteredData, tags: getTags(filteredData), selectedTags };
};