# SPDX Software Bill of Materials

| Package | Version | PURL |
| --- | --- | --- |
{{- range . }}
{{- range .Packages }}
{{- if ne .Name "" }}
{{- if hasPrefix "@" .Name }}
| {{ .Name }} | {{ .Version }} | pkg:npm/%40{{ trimPrefix "@" .Name }}@{{ .Version }} |
{{- else }}
| {{ .Name }} | {{ .Version }} | pkg:npm/{{ .Name }}@{{ .Version }} |
{{- end }}
{{- end }}
{{- end }}
{{- end }}
