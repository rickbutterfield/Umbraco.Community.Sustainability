# Umbraco.Community.Sustainability

[![Downloads](https://img.shields.io/nuget/dt/Umbraco.Community.Sustainability?color=cc9900)](https://www.nuget.org/packages/Umbraco.Community.Sustainability/)
[![NuGet](https://img.shields.io/nuget/v/Umbraco.Community.Sustainability?color=0273B3)](https://www.nuget.org/packages/Umbraco.Community.Sustainability)
[![GitHub license](https://img.shields.io/github/license/rickbutterfield/Umbraco.Community.Sustainability?color=8AB803)](../LICENSE)

A package from the [Umbraco Community Sustainability Team](https://umbraco.com/blog/meet-the-new-community-sustainability-team/) which helps developers and editors see and improve the carbon impact of their websites.

## Installation
> [!IMPORTANT]
> **v2.x** supports Umbraco v14.x
> 
> **v1.x** supports Umbraco v10.8.x - v13.x
> 
> To understand more about which Umbraco CMS versions are actively supported by Umbraco HQ, please see [Umbraco's Long-term Support (LTS) and End-of-Life (EOL) policy](https://umbraco.com/products/knowledge-center/long-term-support-and-end-of-life/).

This package is [available via NuGet](https://www.nuget.org/packages/Umbraco.Community.Sustainability).

To install the package, you can use either the .NET CLI:

```
dotnet add package Umbraco.Community.Sustainability
```

or the NuGet Package Manager:

```
Install-Package Umbraco.Community.Sustainability
```

## Features
Once installed, two new features are enabled:

### Sustainability section
A section is enabled automatically for admin users that allows tracking of average stats based on recent tests, plus a breakdown of all scores per page.

<img src="https://raw.githubusercontent.com/rickbutterfield/Umbraco.Community.Sustainability/main/.github/assets/sustainability-dashboard-1.png" alt="Umbraco.Community.Sustainability dashboard" />

### Sustainability content app
On each content page, a Content App is added which allows users to see and benchmark page weight and carbon emissions, which is then converted to a carbon rating for individual pages.

<img src="https://raw.githubusercontent.com/rickbutterfield/Umbraco.Community.Sustainability/main/.github/assets/sustainability-contentapp-2.jpeg" alt="Umbraco.Community.Sustainability content app" />

## Installation

Add the package to an existing Umbraco website from nuget:

`dotnet add package Umbraco.Community.Sustainability`

Once added, a new Content App will be available alongside your Umbraco pages allowing you to trigger a sustainability report.

## Configuration

You will need to add the following configuration to you appSettings.json file. 
The AcceptedFileTypes are the media types that you can create in the media library, not the file extensions of your files

  ```
  "Umbraco": {
    "CMS":{
        "MediaLibrary" : {
            "Optimisation":{
                "Enable" : bool,
                "AcceptedFileTypes" : 
                {
                    "<<Media File Type here>>" : "<<MAX file size in bytes here>>",
                    "<<Media File Type here>>" : "<<MAX file size in bytes here>>"
                }
            }
        }
    }
  }
  ```

## Contributing

Contributions to this package are most welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) for how to get involved.

Here are some things for our roadmap:

- A visual review of the content app (particularly with v14/Belissima in mind)
- Dashboard
- Health checks
- Content and media warnings
- Configuration options
- Improved accuracy of reporting

## License

Copyright &copy; [Rick Butterfield](https://github.com/rickbutterfield), [Thomas Morris](https://github.com/tcmorris) and other contributors.

Licensed under the [MIT License](https://github.com/rickbutterfield/Umbraco.Community.Sustainability/blob/main/LICENSE.md).
