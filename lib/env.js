/* eslint-disable camelcase */
'use strict';

module.exports = (info, externalEnvs) => ({
	// Mock values
	alfred_workflow_name: info.name,
	alfred_workflow_version: info.version,
	alfred_uid: `alfred-${info.name}`,
	alfred_bundleId: `${info.creator}.${info.name}`,
	alfred_version: '3.0.3',
	alfred_theme: 'alfred.theme.yosemite',
	alfred_theme_background: 'rgba(255,255,255,0.98)',
	alfred_theme_subtext: '3',
	alfred_theme_subtext: '0',
	alfred_workflow_data: info.data,
	alfred_workflow_cache: info.cache,
	alfred_preferences: '',
	alfred_preferences_localhash: '',
	alfred_debug: '1',

	// Arvis env variables
	arvis_version: (externalEnvs && externalEnvs.version) ? externalEnvs.version : 'arvish-test',
	arvis_extension_bundleid: `${info.creator}.${info.name}`,
	arvis_extension_cache: info.cache,
	arvis_extension_data: info.data,
	arvis_extension_name: info.name,
	arvis_extension_type: info.type,
	arvis_extension_version: info.version,
	arvis_extension_history: 'not supported',
	arvis_platform_appData: 'not supported',
	arvis_platform_cache: 'not supported',
	arvis_platform_crushDumps: 'not supported',
	arvis_platform_desktop: 'not supported',
	arvis_platform_documents: 'not supported',
	arvis_platform_downloads: 'not supported',
	arvis_platform_exe: 'not supported',
	arvis_platform_home: 'not supported',
	arvis_platform_logs: 'not supported',
	arvis_platform_module: 'not supported',
	arvis_platform_music: 'not supported',
	arvis_platform_pictures: 'not supported',
	arvis_platform_recent: 'not supported',
	arvis_platform_temp: 'not supported',
	arvis_platform_userData: 'not supported',
	arvis_platform_videos: 'not supported',

	...externalEnvs
});
