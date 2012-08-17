<!---
	This file has been specifically created so it will run on
	all versions of CF from 7+
--->
<cfparam name="url.files" default="">
<cfscript>
	variables.sType					= "text/html";
	variables.lstFiles				= url.files;
	variables.aFiles				= variables.lstFiles.split(",");
	variables.sContents				= "";
	variables.nFileCount			= arrayLen(variables.aFiles);
	
	// guess file type
	variables.sExtension			= listLast(variables.aFiles[1], ".");
	if (listFindNoCase("js,html,css", variables.sExtension)) {
		if (variables.sExtension IS "js") {
			variables.sType			= "text/javascript";
		}
		else {
			variables.sType			= "text/" & variables.sExtension;
		}
	}
	
	variables.bWrap					= structKeyExists(url, "wrap");
</cfscript>
<cfoutput>
	<cfloop from="1" to="#variables.nFileCount#" index="variables.iFile">
		<cfsavecontent variable="variables.sFileContent">
			<!--- intentionally using cfmodule here so there are no variable collisions --->
			<cfif variables.bWrap><entry url="#variables.aFiles[variables.iFile]#"></cfif><cfmodule template="#variables.aFiles[variables.iFile]#"><cfif variables.bWrap></entry></cfif>
		</cfsavecontent>
		<cfset variables.sContents	= variables.sContents & trim(variables.sFileContent)>
	</cfloop>
</cfoutput>
<cfcontent reset="true" type="#variables.sType#">
<cfoutput>#variables.sContents#</cfoutput>
<cfheader name="Content-Length" value="#len(variables.sContents)#">
