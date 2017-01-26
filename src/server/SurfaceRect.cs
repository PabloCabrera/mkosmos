public class SurfaceRect
{
	public uint left;
	public uint top;
	public uint right;
	public uint bottom;
	public byte[][] data;

	public SurfaceRect (uint left, uint top, uint right, uint bottom, byte[][] data)
	{
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.data = data;
	}

	public byte GetSurfaceAt (uint x, uint y)
	{
		if (x >= left && x <= right && y >= top && y <= bottom)
		{
			return this.data[x-left][y-top];
		}
		else
		{
			return 255;
		}
	}

}