using System;

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
}
