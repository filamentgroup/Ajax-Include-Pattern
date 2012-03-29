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
</cfscript>
<cfoutput>
	<cfloop from="1" to="#variables.nFileCount#" index="variables.iFile">
		<cfsavecontent variable="variables.sFileContent">
			<!--- intentionally using cfmodule here so there are no variable collisions --->
			<page url="#variables.aFiles[variables.iFile]#"><cfmodule template="#variables.aFiles[variables.iFile]#"></page>
		</cfsavecontent>
		<cfset variables.sContents	= variables.sContents & trim(variables.sFileContent)>
	</cfloop>
</cfoutput>
<cfcontent reset="true" type="#variables.sType#">
<cfoutput>#variables.sContents#</cfoutput>
<cfheader name="Content-Length" value="#len(variables.sContents)#">
