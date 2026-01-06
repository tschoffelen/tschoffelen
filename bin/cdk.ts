#!/usr/bin/env node
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as patterns from "aws-cdk-lib/aws-route53-patterns";
import * as route53 from "aws-cdk-lib/aws-route53";

export class SchofDomainRedirectsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // "schoffelen.net" domain redirect
    new patterns.HttpsRedirect(this, "schoffelen.net-redirect", {
      recordNames: ["schoffelen.net", "www.schoffelen.net", "thomas.schoffelen.net"],
      targetDomain: "schof.co",
      zone: route53.HostedZone.fromHostedZoneAttributes(this, "schoffelen.net-zone", {
        hostedZoneId: "Z0628374GZPC2824PMPQ",
        zoneName: "schoffelen.net",
      }),
    });

    // "tschoffelen.com" domain redirect
    new patterns.HttpsRedirect(this, "tschoffelen.com-redirect", {
      recordNames: ["tschoffelen.com", "www.tschoffelen.com"],
      targetDomain: "schof.co",
      zone: route53.HostedZone.fromHostedZoneAttributes(this, "tschoffelen.com-zone", {
        hostedZoneId: "Z04965401S0UMTWVDYKYY",
        zoneName: "tschoffelen.com",
      }),
    });

    // "thomasschoffelen.com" domain redirect
    new patterns.HttpsRedirect(this, "thomasschoffelen.com-redirect", {
      recordNames: ["thomasschoffelen.com", "www.thomasschoffelen.com"],
      targetDomain: "schof.co",
      zone: route53.HostedZone.fromHostedZoneAttributes(this, "thomasschoffelen.com-zone", {
        hostedZoneId: "ZYO6Q7UJ88ZTJ",
        zoneName: "thomasschoffelen.com",
      }),
    });

    // "youngurbandesign.co" domain redirect
    new patterns.HttpsRedirect(this, "youngurbandesign.co-redirect", {
      recordNames: ["youngurbandesign.co", "www.youngurbandesign.co"],
      targetDomain: "schoffelen.net",
      zone: route53.HostedZone.fromHostedZoneAttributes(this, "youngurbandesign.co-zone", {
        hostedZoneId: "Z02288173Q43NPEZGB2SU",
        zoneName: "youngurbandesign.co",
      }),
    });
  }
}

const app = new cdk.App();
new SchofDomainRedirectsCdkStack(app, "schof-domain-redirects");
