using System;
using System.IO;

public class WorldMap
{
	uint width;
	uint height;
	byte[,] map;

	public WorldMap (uint width, uint height)
	{
		this.width = width;
		this.height = height;
		this.map = new byte[width, height];
	}

	public WorldMap (string fileName)
	{
		this.LoadMapFromFile (fileName);
	}


	public byte GetSurfaceAt (uint x, uint y)
	{
		if (x < this.width && y < this.height)
		{
			return map[x,y];
		}
		else
		{
			return 255;
		}
		
	}

	public SurfaceRect GetSurfaceRect (uint left, uint top, uint right, uint bottom)
	{
		byte[][] rect = null;

		if (right < this.width && left < right && bottom < this.height && top < bottom)
		{
			uint rectWidth = 1 + right - left;
			uint rectHeight = 1 + bottom - top;
			rect = new byte[rectWidth][];

			for (uint x = left; x <= right; x++)
			{
				rect[x-left] = new byte[rectHeight];
				for (uint y = top; y <= bottom; y++)
				{
					rect[x-left][y-top] = this.map[x, y];
				}
			}
		}
		return new SurfaceRect (left, top, right, bottom, rect);
	}

	public bool SetSurfaceAt (uint x, uint y, byte surface)
	{
		if (x < this.width && y < this.height)
		{
			map[x,y] = surface;
			return true;
		}
		else
		{
			return false;
		}
	}

	public bool SetSurfaceRect (uint left, uint top, uint right, uint bottom, byte surface)
	{
		if (right < this.width && left < right && bottom < this.height && top < bottom)
		{
			for (uint x = left; x <= right; x++)
			{
				for (uint y = top; y <= bottom; y++)
				{
					this.map[x,y] = surface;
				}
			}
			return true;
		}
		return false;
	}

	public bool SetSurfaceCircle (uint x, uint y, uint radius, byte surface)
	{
		if (x+radius >= this.width || y+radius >= this.height)
		{
			return false;
		}

		for (uint yPos = y-radius; yPos < y+radius; yPos++) {
			double hip2 = Math.Pow(radius, 2);
			double b2 = Math.Pow ((y-yPos), 2);
			uint xLimit = (uint) Math.Sqrt (hip2 - b2);
			for (uint xPos = (x-xLimit); xPos < (x+xLimit); xPos++) {
				this.map[xPos, yPos] = surface;
			}
		}
		return true;
	}

	public bool LoadMapFromFile (string fileName)
	{
		try
		{
			FileStream stream = File.Open (fileName, FileMode.Open, FileAccess.Read);
			this.width = this.GetUIntFromFileStream (stream);
			this.height = this.GetUIntFromFileStream (stream);
			this.map = this.GetMapFromFileStream (stream, this.width, this.height);
			stream.Close();
			
		}
		catch (Exception e)
		{
			return false;
		}
		return true;
	}

	private uint GetUIntFromFileStream (FileStream stream)
	{
		byte[] readedBytes = new byte[4];
		stream.Read (readedBytes, 0, 4);
		if (BitConverter.IsLittleEndian)
		{
			Array.Reverse (readedBytes);
		}
		return BitConverter.ToUInt32(readedBytes, 0);
	}

	private byte[,] GetMapFromFileStream (FileStream stream, uint width, uint height)
	{
		byte[] unidimensionalMap = this.ReadNBytes (stream, this.width*this.height);
		byte[,] bidimensionalMap = new byte[width, height];

		for (uint x=0; x<width; x++)
		{
			for (uint y=0; y<height; y++)
			{
				this.map [x, y] = unidimensionalMap [ x*width + y ];
			}
		}

		return bidimensionalMap;
	}

	private byte[] ReadNBytes (FileStream stream, uint n)
	{	
		byte[] bytes = new byte[n];
		int left = (int) n;
		int offset = 0;
		int readed = 0;

		while (left > 0) {
			readed = stream.Read (bytes, offset, left);
			offset += readed;
			left = ((int) n) - offset;
		}

		return bytes;
	}

	public bool SaveMapToFile (string fileName)
	{
		try
		{
			FileStream stream = File.Open (fileName, FileMode.Create, FileAccess.Write);
			this.PutUIntToFileStream (stream, this.width);
			this.PutUIntToFileStream (stream, this.height);
			this.PutMapToFileStream (stream, this.map, this.width, this.height);
			stream.Close ();
		}
		catch (Exception e)
		{
			return false;
		}
		return true;
	}

	public void PutUIntToFileStream (FileStream stream, uint value)
	{
		byte[] bytes = BitConverter.GetBytes (value);
		stream.Write (bytes, 0, 4);
	}

	public void PutMapToFileStream (FileStream stream, byte[,] map, uint width, uint height)
	{
		byte[] unidimensionalMap = new byte [width*height];

		for (uint x=0; x<width; x++)
		{
			for (uint y=0; y<height; y++)
			{
				unidimensionalMap [ x*width + y ] = map [x, y];
			}
		}
		stream.Write (unidimensionalMap, 0, (int) (width*height));
	}
}
