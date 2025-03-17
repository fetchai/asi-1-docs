import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { packageName, packageType } = await req.json();
    console.log({ packageName, packageType }, "DS");

    let url;
    if (packageType === "pypi") {
      url = `https://pypi.org/pypi/${packageName}/json`;
    } else if (packageType === "npm") {
      url = `https://registry.npmjs.org/${packageName}/latest`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const apiResponse = await response.json();
    const latestVersion =
      packageType === "pypi" ? apiResponse?.info?.version : apiResponse?.version;

    return NextResponse.json({ latestVersion });
  } catch (error) {
    console.error("Error fetching package version:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}