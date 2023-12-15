"use client"

import React, { useEffect } from "react";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "hcm",
  endpoint: "https://s3.fstorage.vn",
  credentials: {
    secretAccessKey: "Secret_key",
    accessKeyId: "Access_key"
  }
});
export default function Home() {

  const fetchData = async () => {
    const command = new ListBucketsCommand({});
    try {
      const { Owner, Buckets } : any= await client.send(command);
      console.log(
        `${Owner.DisplayName} owns ${Buckets.length} bucket${
          Buckets.length === 1 ? "" : "s"
        }:`,
      );
      console.log(`${Buckets.map((b: { Name: any; }) => ` • ${b.Name}`).join("\n")}`);
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(( ) => {
    fetchData();
  },[])

  return (
    <div>
      <h1>S3 Bucket Contents</h1>
    </div>
  );
}
