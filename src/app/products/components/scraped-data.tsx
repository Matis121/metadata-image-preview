"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GetMetaData } from "../server/getMetaData";

type MetaProducts = {
  title: string;
  description: string;
  images: string[];
  url: string;
};

export function ScrapedData({ imageUrl }: { imageUrl: string }) {
  const [metaProduct, setMetaProduct] = useState<MetaProducts | null>(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const res: any = await GetMetaData(imageUrl);
      setMetaProduct(res);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [imageUrl]);

  const printComponent = () => {
    if (loading) {
      return (
        <div className="h-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      );
    }

    if (metaProduct?.images[0]) {
      return (
        <div className="flex items-center justify-center flex-col h-[400px] break-words border overflow-hidden hover:cursor-pointer">
          <a
            href={`${metaProduct.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              alt="component image"
              width={400}
              height={400}
              style={{ width: "100%", height: "auto" }}
              src={metaProduct.images[0]}
            />
          </a>
        </div>
      );
    }

    return (
      <div className="h-full flex items-center justify-center">
        <p>No image available.</p>
      </div>
    );
  };

  return <>{printComponent()}</>;
}
